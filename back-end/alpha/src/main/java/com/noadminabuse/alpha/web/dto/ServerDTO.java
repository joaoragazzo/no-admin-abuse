package com.noadminabuse.alpha.web.dto;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTagsEnum;
import com.noadminabuse.alpha.model.enums.general.Region;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record ServerDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank String ip,
    @NotBlank String port,
    @NotBlank List<DayZGameTagsEnum> tags,
    @NotEmpty Region region
) {}
