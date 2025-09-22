package com.noadminabuse.alpha.web.dto.review;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;
import com.noadminabuse.alpha.web.dto.user.UserBasicInfoDTO;

public record ReviewDisplayDTO(
    UUID id,
    UserBasicInfoDTO author,
    Boolean isAnonymous,
    String text,
    Integer rating,
    Instant createdAt,
    List<NetworkTagDTO> tags
) {}
