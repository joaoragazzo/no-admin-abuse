package com.noadminabuse.alpha.web.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.web.dto.NetworkDTO;
import com.noadminabuse.alpha.web.dto.dayz.DayZFiltersDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@AllArgsConstructor
@RequestMapping("/server")
public class ServerController {
    private final NetworkService networkService;

    @PutMapping("/bulk")
    public ResponseEntity<String> bulk(@RequestBody @Valid List<NetworkDTO> dtos) {
        networkService.createNetwork(dtos);
        return ResponseEntity.ok().body("ok");
    }

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
