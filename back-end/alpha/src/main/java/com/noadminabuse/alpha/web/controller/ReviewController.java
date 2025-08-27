package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.messages.ReviewMessage;
import com.noadminabuse.alpha.service.ReviewService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.dto.MessageDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final FeedbackMapper feedbackMapper;
    
    @PostMapping("/{networkId}")
    public ResponseEntity<MessageDTO> createReview(
        @PathVariable UUID networkId,
        @RequestBody @Valid ReviewCreationDTO dto
    ) {
        UUID authorId = SecurityUtils.getCurrentUserId();
        reviewService.createReview(dto, authorId, networkId);
        
        return ResponseEntity.ok().body(feedbackMapper.success(ReviewMessage.REVIEW_SUCCESS_POSTED));
    }

    @GetMapping("/{networkId}")
    public ResponseEntity<ReviewDisplayResponseDTO> getReview(@PathVariable UUID networkId) {
        
        if (SecurityUtils.isLogged()) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return ResponseEntity.ok().body(reviewService.getAllReviewsDisplay(networkId, userId, 0));
        }

        return ResponseEntity.ok().body(reviewService.getAllReviewsDisplay(networkId, 0));
        
    }
    
    @GetMapping("/{networkId}/stats")
    public List<ReviewStatsDTO> getMethodName(@PathVariable UUID networkId) {
        return reviewService.getReviewStats(networkId);
    }
    

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<MessageDTO> deleteReview(@PathVariable UUID reviewId) {
        UUID userId = SecurityUtils.getCurrentUserId();
        reviewService.deleteReview(reviewId, userId);
        return ResponseEntity.ok().body(feedbackMapper.success(ReviewMessage.REVIEW_SUCCESS_DELETED));
    }


}
