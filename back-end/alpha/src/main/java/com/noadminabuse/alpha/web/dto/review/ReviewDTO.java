package com.noadminabuse.alpha.web.dto.review;

import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;

public record ReviewDTO(
    UUID id,
    @PositiveOrZero @Min(0) @Max(5) Integer rating,
    String text,
    Boolean anonymous
) {}
