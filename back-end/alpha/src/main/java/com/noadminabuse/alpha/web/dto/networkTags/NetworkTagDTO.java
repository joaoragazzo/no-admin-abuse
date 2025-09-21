package com.noadminabuse.alpha.web.dto.networkTags;

import java.util.UUID;

public record NetworkTagDTO(
    UUID id,
    String slug,
    Boolean isPositive
) {}
