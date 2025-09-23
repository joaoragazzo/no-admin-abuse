package com.noadminabuse.alpha.web.dto.dayz;

import java.util.List;

import com.noadminabuse.alpha.enums.Region;
import com.noadminabuse.alpha.enums.dayz.DayZGameTags;

import jakarta.validation.constraints.Min;

public record SearchFilterDTO(
    List<DayZGameTags> tags,
    @Min(0) Integer page,
    String search,
    Region region,
    Integer size,
    String gameSlug
) {
    public SearchFilterDTO {
        
        if (size == null) { 
            size = 10;
        }
    }
}
