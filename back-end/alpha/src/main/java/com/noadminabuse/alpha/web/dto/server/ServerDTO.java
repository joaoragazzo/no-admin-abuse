package com.noadminabuse.alpha.web.dto.server;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.model.enums.CountryCode;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public record ServerDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank String ip,
    @NotBlank Integer port,
    @NotEmpty List<DayZGameTags> tags,
    @NonNull CountryCode country,
    @Positive Integer maxPlayers,
    @Positive Integer onlinePlayers,
    String battlemetricsId
) {}
