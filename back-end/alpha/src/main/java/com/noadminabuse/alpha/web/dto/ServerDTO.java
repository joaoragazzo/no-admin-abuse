package com.noadminabuse.alpha.web.dto;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.model.enums.CountryCode;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record ServerDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank String ip,
    @NotBlank String port,
    @NotEmpty List<DayZGameTags> tags,
    @NonNull CountryCode country
) {}
