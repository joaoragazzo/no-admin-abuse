package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.ReviewService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.dto.ReviewDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;
    
    @PostMapping("/{network}")
    public ResponseEntity<?> createReview(@RequestBody @Valid ReviewDTO dto) {
        UUID authorId = SecurityUtils.getCurrentUserId();
        reviewService.createReview(dto, authorId, authorId);
        
        return ResponseEntity.ok().body("Ok!");
    }
    
}
