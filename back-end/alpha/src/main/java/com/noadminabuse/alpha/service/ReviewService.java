package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.Conflict;
import com.noadminabuse.alpha.errors.enums.ReviewErrorMessage;
import com.noadminabuse.alpha.mapper.ReviewMapper;
import com.noadminabuse.alpha.mapper.UserMapper;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.repository.ReviewRepository;
import com.noadminabuse.alpha.web.dto.ReviewDTO;
import com.noadminabuse.alpha.web.dto.ReviewDisplayDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final UserMapper userMapper;

    public Review createReview(ReviewDTO reviewDTO, UUID userId, UUID networkId) {
        if (alreadyHasANetworkReview(userId, networkId)) 
            throw new Conflict(ReviewErrorMessage.REVIEW_ALREADY_EXISTS);

        Review review = reviewMapper.toReviewEntity(reviewDTO, userId, networkId);
        return reviewRepository.save(review);
    }

    public List<ReviewDisplayDTO> getAllReviewsDisplay(UUID networkId) {
        List<Review> reviews = reviewRepository.findByNetworkId(networkId);
        List<ReviewDisplayDTO> reviewsDTO = reviews.stream().map((review) -> {
            return reviewMapper.toReviewDisplayDTO(review, userMapper.toUserBasicInfoDTO(review.getAuthor()));
        }).toList();
        List<ReviewDisplayDTO> result = this.hideAnonymousReviews(reviewsDTO);
        return result;
        
    }

    private boolean alreadyHasANetworkReview(UUID userId, UUID networkId) {
        return reviewRepository.findByNetworkIdAndAuthorId(networkId, userId).isPresent();
    }

    private List<ReviewDisplayDTO> hideAnonymousReviews(List<ReviewDisplayDTO> reviews) {
        return reviews.stream().map((review) -> {
            if (!review.isAnonymous()) return review;
            return new ReviewDisplayDTO(
                review.id(), 
                null, 
                true, 
                review.text(), 
                review.rating(), 
                review.createdAt()
            );
        }).toList();
    }


}
