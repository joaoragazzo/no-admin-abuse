package com.noadminabuse.alpha.web.dto.gameplay;

import java.util.List;
import java.util.UUID;

public record GameplayTagDTO(
    UUID id,
    String slug,
    List<GameplayTagAliasDTO> aliases
) {}
