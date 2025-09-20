package com.noadminabuse.alpha.web.dto.networkTags;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public record CreateNetworkTagDTO(
    @NotBlank String tagSlug,
    Boolean isPositive,
    UUID gameId
) {}
