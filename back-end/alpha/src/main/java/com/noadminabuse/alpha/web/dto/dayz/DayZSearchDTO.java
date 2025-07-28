package com.noadminabuse.alpha.web.dto.dayz;

import java.util.List;


import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import jakarta.validation.constraints.NotBlank;

public record DayZSearchDTO(
    @NotBlank List<DayZGameTags> tags,
    @NotBlank Integer page,
    @NotBlank String search,
    Integer size
) {
    public DayZSearchDTO {
        
        if (size == null) { 
            size = 10;
        }

        if (search == null) {
            search = "";
        }
    }
}
