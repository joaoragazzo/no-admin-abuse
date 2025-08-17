package com.noadminabuse.alpha.web.dto.auth;

import java.util.UUID;

public record UserFullInfoDTO(
    UUID id,
    Boolean eula,
    String steam64id,
    String username,
    String avatarUrl
) {
} 
