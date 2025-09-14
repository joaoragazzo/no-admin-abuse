package com.noadminabuse.alpha.web.dto.dayz;

import java.util.List;


import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import jakarta.validation.constraints.Min;

import com.noadminabuse.alpha.model.enums.Region;

public record SearchFilterDTO(
    List<DayZGameTags> tags,
    @Min(0) Integer page,
    String search,
    Region region,
    Integer size,
    String game
) {
    public SearchFilterDTO {
        
        if (size == null) { 
            size = 10;
        }
    }
}
