package com.noadminabuse.alpha.web.dto.user;

import java.util.UUID;

public record UserFullInfoDTO(
    UUID id,
    Boolean eula,
    String steam64id,
    String username,
    String avatarUrl
) {
} 
