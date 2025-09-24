package com.noadminabuse.alpha.web.controller;


import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.web.controller.docs.ServerApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.dayz.DayZFiltersDTO;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@AllArgsConstructor
@RequestMapping("/servers")
public class ServerController extends BaseController implements ServerApi {

    @GetMapping("/filters")
    public ApiResponseDTO<DayZFiltersDTO> fetchDayZFilters() {
        DayZFiltersDTO filters = new DayZFiltersDTO(DayZGameTags.values());
        return ok(filters);
    }
      
}
