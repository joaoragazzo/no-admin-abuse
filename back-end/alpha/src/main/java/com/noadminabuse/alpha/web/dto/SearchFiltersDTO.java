package com.noadminabuse.alpha.web.dto;

import java.util.List;


import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import jakarta.validation.constraints.NotBlank;

public record SearchFiltersDTO(
    @NotBlank List<DayZGameTags> tags,
    @NotBlank Integer page,
    Integer size
) {
    public SearchFiltersDTO {
        if (size == null) { 
            size = 10;
        }
    }
}
