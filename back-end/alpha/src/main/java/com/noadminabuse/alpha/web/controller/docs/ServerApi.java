package com.noadminabuse.alpha.web.controller.docs;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.dayz.DayZFiltersDTO;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Servidores", description = "Operações de servidores")
public interface ServerApi {
    public ApiResponseDTO<DayZFiltersDTO> fetchDayZFilters();
}
