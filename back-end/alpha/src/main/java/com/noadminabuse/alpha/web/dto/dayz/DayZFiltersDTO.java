package com.noadminabuse.alpha.web.dto.dayz;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.enums.general.Region;

public record DayZFiltersDTO(
    DayZGameTags[] tags,
    Region[] regions
) {}
