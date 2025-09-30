package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.Conflict;
import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.Unauthorized;
import com.noadminabuse.alpha.errors.enums.NetworkErrorMessage;
import com.noadminabuse.alpha.errors.enums.ReviewErrorMessage;
import com.noadminabuse.alpha.errors.enums.UserErrorMessage;
import com.noadminabuse.alpha.mapper.ReviewMapper;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.repository.NetworkRepository;
import com.noadminabuse.alpha.repository.ReviewRepository;
import com.noadminabuse.alpha.repository.UserRepository;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final NetworkRepository networkRepository;
    private final ReviewMapper reviewMapper;

    public Review createReview(Review review) {
        if (
            alreadyHasANetworkReview(
                review.getAuthor().getId(), 
                review.getNetwork().getId()
            )
        ) 
            throw new Conflict(ReviewErrorMessage.REVIEW_ALREADY_EXISTS);
        
        updateStatsOnAddReview(review.getNetwork().getId(), review.getRating());
        return reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(UUID reviewId, UUID userId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(
            () -> new NotFound(ReviewErrorMessage.REVIEW_NOT_FOUND)
        );
        
        if (!this.checkOwnership(reviewId, userId)) 
            throw new Unauthorized(ReviewErrorMessage.CANNOT_DELETE_THIS_REVIEW);
        
        UUID networkId = review.getNetwork().getId();
        
        updateStatsOnRemoveReview(networkId, review.getRating());
        reviewRepository.deleteById(reviewId);
    }

    @Transactional
    public void likeReview(UUID reviewId, UUID userId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(
            () -> new NotFound(ReviewErrorMessage.REVIEW_NOT_FOUND)
        );

        if (review.getLikedByUsers().stream().anyMatch(user -> user.getId().equals(userId))) {
            throw new Conflict(ReviewErrorMessage.REVIEW_ALREADY_LIKED);
        }

        User user = userRepository.findById(userId).orElseThrow(
            () -> new NotFound(UserErrorMessage.USER_NOT_FOUND)
        );

        user.getLikedReviews().add(review);
        review.getLikedByUsers().add(user);
    }

    @Transactional
    public void unlikeReview(UUID reviewId, UUID userId) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(
            () -> new NotFound(ReviewErrorMessage.REVIEW_NOT_FOUND)
        );

        if (review.getLikedByUsers().stream().noneMatch(user -> user.getId().equals(userId))) {
            throw new Conflict(ReviewErrorMessage.REVIEW_NOT_LIKED_YET);
        }

        User user = userRepository.findById(userId).orElseThrow(
            () -> new NotFound(UserErrorMessage.USER_NOT_FOUND)
        );

        review.getLikedByUsers().removeIf(_user -> _user.getId().equals(userId));
        user.getLikedReviews().removeIf(_review -> _review.getId().equals(reviewId));
    }

    public ReviewDisplayResponseDTO getAllReviewsDisplay(UUID networkId, UUID userId, Integer page) {
        Page<ReviewDisplayDTO> reviews = getReviewsPage(networkId, page, userId);
    
        ReviewDisplayDTO ownReview = reviewRepository.findByNetworkIdAndAuthorId(networkId, userId)
            .map(review -> reviewMapper.toReviewDisplayDTO(review, userId))
            .orElse(null);
    
        return reviewMapper.toReviewDisplayResponse(ownReview, reviews);
    }
    
    public ReviewDisplayResponseDTO getAllReviewsDisplay(UUID networkId, Integer page) {
        Page<ReviewDisplayDTO> reviews = getReviewsPage(networkId, page, null);
    
        return reviewMapper.toReviewDisplayResponse(null, reviews);
    }

    public Optional<ReviewDisplayDTO> getUserNetworkReview(UUID networkId, UUID userId)  {
        return reviewRepository
            .findByNetworkIdAndAuthorId(networkId, userId)
            .map((review) -> reviewMapper.toReviewDisplayDTO(review, userId));
    }

    public List<ReviewStatsDTO> getReviewStats(UUID networkId) {
        return reviewRepository.getReviewStats(networkId);
    }

    private boolean alreadyHasANetworkReview(UUID userId, UUID networkId) {
        return reviewRepository.findByNetworkIdAndAuthorId(networkId, userId).isPresent();
    }

    private ReviewDisplayDTO hideAnonymousReviews(ReviewDisplayDTO review) {
        if (!review.isAnonymous()) return review;
    
        return new ReviewDisplayDTO(
            review.id(), 
            null, 
            true, 
            review.text(), 
            review.rating(), 
            review.createdAt(),
            review.liked(),
            review.likesCount(),
            review.tags()
        );
    }

    private Page<ReviewDisplayDTO> getReviewsPage(UUID networkId, Integer page, UUID userId) {
        Pageable pageable = PageRequest.of(page, 10);
        
        if (userId != null) {
            return reviewRepository.findByNetworkIdAndAuthorIdNot(networkId, userId, pageable)
                .map(review -> reviewMapper.toReviewDisplayDTO(review, userId))
                .map(this::hideAnonymousReviews);
        }

        return reviewRepository.findByNetworkId(networkId, pageable)
            .map(review -> reviewMapper.toReviewDisplayDTO(review, userId))
            .map(this::hideAnonymousReviews);
    }

    private boolean checkOwnership(UUID reviewId, UUID userId) {
        return reviewRepository.existsByIdAndAuthorId(reviewId, userId);
    }

    private void updateStatsOnAddReview(UUID networkId, Integer rating) {
        Network network = networkRepository.findById(networkId)
            .orElseThrow(() -> new NotFound(NetworkErrorMessage.NETWORK_NOT_FOUND));
    
        Long oldCount = network.getReviewsAmount();
        Long oldAvg = network.getReviewsAvg();
    
        Long newAvg = (oldAvg * oldCount + rating) / (oldCount + 1);
    
        network.setReviewsAmount(oldCount + 1);
        network.setReviewsAvg(newAvg);
        networkRepository.save(network);
    }

    private void updateStatsOnRemoveReview(UUID networkId, int removedRating) {
        Network network = networkRepository.findById(networkId)
            .orElseThrow(() -> new NotFound(NetworkErrorMessage.NETWORK_NOT_FOUND));
    
        Long oldCount = network.getReviewsAmount();
        Long oldAvg =  network.getReviewsAvg();
    
        if (oldCount <= 1) {
            network.setReviewsAmount(0L);
            network.setReviewsAvg(0L);
        } else {
            Long newAvg = (oldAvg * oldCount - removedRating) / (oldCount - 1);
            network.setReviewsAmount(oldCount - 1);
            network.setReviewsAvg(newAvg);
        }
    
        networkRepository.save(network);
    }
}
