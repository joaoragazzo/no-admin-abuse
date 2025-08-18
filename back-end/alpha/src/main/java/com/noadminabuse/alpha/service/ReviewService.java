package com.noadminabuse.alpha.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.Conflict;
import com.noadminabuse.alpha.errors.Unauthorized;
import com.noadminabuse.alpha.errors.enums.ReviewErrorMessage;
import com.noadminabuse.alpha.mapper.ReviewMapper;
import com.noadminabuse.alpha.mapper.UserMapper;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.repository.ReviewRepository;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserMapper userMapper;

    public Review createReview(ReviewCreationDTO reviewDTO, UUID userId, UUID networkId) {
        if (alreadyHasANetworkReview(userId, networkId)) 
            throw new Conflict(ReviewErrorMessage.REVIEW_ALREADY_EXISTS);

        Review review = reviewMapper.toReviewCreationEntity(reviewDTO, userId, networkId);
        return reviewRepository.save(review);
    }

    public void deleteReview(UUID reviewId, UUID userId) {
        if (!this.checkOwnership(reviewId, userId)) {
            throw new Unauthorized(ReviewErrorMessage.CANNOT_DELETE_THIS_REVIEW);
        }

        reviewRepository.deleteById(reviewId);
    }

    public ReviewDisplayResponseDTO getAllReviewsDisplay(UUID networkId, UUID userId, Integer page) {
        Page<ReviewDisplayDTO> reviews = getReviewsPage(networkId, page, userId);
    
        ReviewDisplayDTO ownReview = reviewRepository.findByNetworkIdAndAuthorId(networkId, userId)
            .map(review -> reviewMapper.toReviewDisplayDTO(review, userMapper.toUserBasicInfoDTO(review.getAuthor())))
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
            .map((review) -> reviewMapper.toReviewDisplayDTO(review, userMapper.toUserBasicInfoDTO(review.getAuthor())));
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
            review.createdAt()
        );
    }

    private Page<ReviewDisplayDTO> getReviewsPage(UUID networkId, Integer page, UUID excludeUserId) {
        Pageable pageable = PageRequest.of(page, 10);
        
        if (excludeUserId != null) {
            return reviewRepository.findByNetworkIdAndAuthorIdNot(networkId, excludeUserId, pageable)
                .map(review -> reviewMapper.toReviewDisplayDTO(review, userMapper.toUserBasicInfoDTO(review.getAuthor())))
                .map(this::hideAnonymousReviews);
        }

        return reviewRepository.findByNetworkId(networkId, pageable)
            .map(review -> reviewMapper.toReviewDisplayDTO(review, userMapper.toUserBasicInfoDTO(review.getAuthor())))
            .map(this::hideAnonymousReviews);
    }

    private boolean checkOwnership(UUID reviewId, UUID userId) {
        return reviewRepository.existsByIdAndAuthorId(reviewId, userId);
    }
}
