package com.noadminabuse.alpha.web.dto.game;

import java.util.UUID;

public record GameInfoDTO(
    UUID id,    
    String name,
    String slug
) {}
