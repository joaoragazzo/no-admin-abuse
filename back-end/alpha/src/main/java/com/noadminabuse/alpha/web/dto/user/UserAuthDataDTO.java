package com.noadminabuse.alpha.web.dto.user;

import java.util.Set;
import java.util.UUID;

import com.noadminabuse.alpha.enums.Role;

public record UserAuthDataDTO(
    UUID id,
    Boolean eula,
    String steam64id,
    String username,
    String avatarUrl,
    Set<Role> roles
) {} 
