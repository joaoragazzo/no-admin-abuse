package com.noadminabuse.alpha.web.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.web.dto.dayz.DayZFiltersDTO;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@AllArgsConstructor
@RequestMapping("/servers")
public class ServerController {

    @GetMapping("/filters")
    public ResponseEntity<DayZFiltersDTO> fetchDayZFilters() {
        DayZFiltersDTO filters = new DayZFiltersDTO(DayZGameTags.values());
        return ResponseEntity.ok().body(filters);
    }
    
    @GetMapping("/statistics")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
