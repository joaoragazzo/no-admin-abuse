package com.noadminabuse.alpha.web.dto.networkTags;

import java.util.UUID;

import com.noadminabuse.alpha.web.dto.game.GameInfoDTO;

public record NetworkTagInfoDTO(
    UUID id,
    String tagSlug,
    boolean isPositive,
    GameInfoDTO game
) {}
