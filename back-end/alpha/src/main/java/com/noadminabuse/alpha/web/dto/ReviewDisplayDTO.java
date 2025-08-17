package com.noadminabuse.alpha.web.dto;

import java.time.Instant;
import java.util.UUID;

import com.noadminabuse.alpha.web.dto.auth.UserBasicInfoDTO;

public record ReviewDisplayDTO(
    UUID id,
    UserBasicInfoDTO author,
    Boolean isAnonymous,
    String text,
    Integer rating,
    Instant createdAt
) {}
