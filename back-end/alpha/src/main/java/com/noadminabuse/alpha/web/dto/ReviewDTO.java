package com.noadminabuse.alpha.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;

public record ReviewDTO(
    @PositiveOrZero @Min(0) @Max(5) Integer rating,
    String text,
    Boolean anonymous
) {}
