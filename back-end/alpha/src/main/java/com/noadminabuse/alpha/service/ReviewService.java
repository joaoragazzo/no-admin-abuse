package com.noadminabuse.alpha.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.Conflict;
import com.noadminabuse.alpha.errors.enums.ReviewErrorMessage;
import com.noadminabuse.alpha.mapper.ReviewMapper;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.repository.ReviewRepository;
import com.noadminabuse.alpha.web.dto.ReviewDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReviewService {
    
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;

    public Review createReview(ReviewDTO reviewDTO, UUID userId, UUID networkId) {
        if (alreadyHasANetworkReview(userId, networkId)) 
            throw new Conflict(ReviewErrorMessage.REVIEW_ALREADY_EXISTS);

        Review review = reviewMapper.toReviewEntity(reviewDTO, userId, networkId);
        return review;
    }

    private boolean alreadyHasANetworkReview(UUID userId, UUID networkId) {
        return reviewRepository.findByNetworkIdAndAuthorId(networkId, userId).isPresent();
    }

}
