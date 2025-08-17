package com.noadminabuse.alpha.web.dto.auth;

import java.util.UUID;

public record UserBasicInfoDTO(
    UUID id,
    String name,
    String avatarUrl
) {}
