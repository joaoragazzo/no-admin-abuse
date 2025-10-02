package com.noadminabuse.alpha.web.controller.docs;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.stats.HomepageStatsDTO;

import io.swagger.v3.oas.annotations.Operation;


public interface StatsApi {

    @Operation(summary = "Retorna estatísticas para a homepage")
    public ApiResponseDTO<HomepageStatsDTO> fetchHomepageStats();
}
