package com.noadminabuse.alpha.web.dto.user;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

import com.noadminabuse.alpha.enums.Role;

public record UserFullInfoDTO(
    UUID id,
    String username,
    String avatarUrl,
    Set<Role> roles,
    Instant lastSeenAt,
    Instant createdAt
) {}
