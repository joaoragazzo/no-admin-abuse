package com.noadminabuse.alpha.web.dto.dayz;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;

public record DayZFiltersDTO(
    DayZGameTags[] tags
) {}
