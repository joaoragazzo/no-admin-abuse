package com.noadminabuse.alpha.web.dto.networkTags;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public record CreateNetworkTagDTO(
    @NotBlank String slug,
    Boolean isPositive,
    UUID gameId
) {}
