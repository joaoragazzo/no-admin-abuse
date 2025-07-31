package com.noadminabuse.alpha.web.dto.dayz;

import java.util.List;


import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.enums.Region;

import jakarta.validation.constraints.NotBlank;

public record DayZSearchDTO(
    @NotBlank List<DayZGameTags> tags,
    @NotBlank Integer page,
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
