package com.noadminabuse.alpha.web.dto.auth;

import java.util.UUID;

public record UserInfoDTO(
    UUID id,
    String steam64id,
    String username,
    String avatarUrl
) {
} 
