package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.ReviewMapper;
import com.noadminabuse.alpha.messages.ReviewMessage;
import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.service.ReviewService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.controller.docs.ReviewApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/reviews")
public class ReviewController extends BaseController implements ReviewApi {
    private final ReviewService reviewService;
    private final ReviewMapper reviewMapper;
    private final NetworkService networkService;
    private final NetworkTagService networkTagService;
    
    @PostMapping("/{networkId}")
    public ApiResponseDTO<Void> createReview(
        @PathVariable UUID networkId,
        @RequestBody @Valid ReviewCreationDTO dto
    ) {
        UUID authorId = SecurityUtils.getCurrentUserId();
        
        Game game = networkService.getNetworkById(networkId).getGame();
        networkTagService.ensureAllTagsExists(dto.tags(), game.getId());
        
        Review review = reviewMapper.toReviewCreationEntity(dto, authorId, networkId);
        reviewService.createReview(review);
        
        return success(ReviewMessage.REVIEW_SUCCESS_POSTED);
    }

    @GetMapping("/{networkId}")
    public ApiResponseDTO<ReviewDisplayResponseDTO> getReview(@PathVariable UUID networkId) {
        
        if (SecurityUtils.isLogged()) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return ok(reviewService.getAllReviewsDisplay(networkId, userId, 0));
        }

        return ok(reviewService.getAllReviewsDisplay(networkId, 0));
    }

    @DeleteMapping("/{reviewId}")
    public ApiResponseDTO<Void> deleteReview(@PathVariable UUID reviewId) {
        UUID userId = SecurityUtils.getCurrentUserId();
        reviewService.deleteReview(reviewId, userId);
        
        return success(ReviewMessage.REVIEW_SUCCESS_DELETED);
    }

    @PostMapping("/{reviewId}/like")
    public ApiResponseDTO<Void> likeReview(@PathVariable UUID reviewId) {
        UUID userId = SecurityUtils.getCurrentUserId();
        reviewService.likeReview(reviewId, userId);
        return success(ReviewMessage.REVIEW_LIKED_REVIEW);
    }

    @DeleteMapping("/{reviewId}/like")
    public ApiResponseDTO<Void> unlikeReview(@PathVariable UUID reviewId) {
        UUID userId = SecurityUtils.getCurrentUserId();
        reviewService.unlikeReview(reviewId, userId);
        return success(ReviewMessage.REVIEW_UNLIKED_REVIEW);
    }
    

}
