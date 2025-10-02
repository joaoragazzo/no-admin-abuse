package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.StatsService;
import com.noadminabuse.alpha.web.controller.docs.StatsApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.stats.HomepageStatsDTO;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/stats")
public class Statscontroller extends BaseController implements StatsApi {
    
    private final StatsService statsService;

    @GetMapping("/homepage")
    public ApiResponseDTO<HomepageStatsDTO> fetchHomepageStats() {
        return ok(statsService.fetchHomepageStats()); 
    }
    
}
