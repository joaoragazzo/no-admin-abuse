package com.noadminabuse.alpha.web.dto.review;

import java.util.Set;
import java.util.UUID;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;

public record ReviewCreationDTO(
    UUID id,
    @PositiveOrZero @Min(0) @Max(5) Integer rating,
    String text,
    Boolean anonymous,
    Set<UUID> tags
) {}
