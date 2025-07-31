package com.noadminabuse.alpha.web.dto.dayz;

import java.util.List;


import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

import jakarta.validation.constraints.Min;

import com.noadminabuse.alpha.model.enums.Region;

public record DayZSearchDTO(
    List<DayZGameTags> tags,
    @Min(0) Integer page,
    String search,
    Region region,
    Integer size
) {
    public DayZSearchDTO {
        
        if (size == null) { 
            size = 10;
        }
    }
}
