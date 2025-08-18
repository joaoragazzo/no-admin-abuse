package com.noadminabuse.alpha.web.dto.review;

import org.springframework.data.domain.Page;

public record ReviewDisplayResponseDTO(
    ReviewDisplayDTO ownReview,
    Page<ReviewDisplayDTO> reviews
) {}
