package com.noadminabuse.alpha.web.dto.user;

import java.util.UUID;

public record UserBasicInfoDTO(
    UUID id,
    String name,
    String avatarUrl
) {}
