package com.noadminabuse.alpha.web.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.ServerMapper;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.service.ServerService;
import com.noadminabuse.alpha.web.dto.NetworkDTO;
import com.noadminabuse.alpha.web.dto.dayz.DayZFiltersDTO;
import com.noadminabuse.alpha.web.dto.dayz.DayZSearchDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/server")
public class ServerController {
    private final ServerService serversService;
    private final ServerMapper serverMapper;

    @PutMapping("/bulk")
    public ResponseEntity<String> bulk(@RequestBody @Valid List<NetworkDTO> dtos) {
        serversService.createNetwork(dtos);
        return ResponseEntity.ok().body("ok");
    }

    @PostMapping("/")
    public ResponseEntity<Page<NetworkDTO>> fetchAllServers(@RequestBody @Valid DayZSearchDTO filter) {
        Page<Network> servers = serversService.findAll(
            filter.page(), 
            filter.size(), 
            filter.tags(), 
            filter.search(),
            filter.region()
        );
        Page<NetworkDTO> response = servers.map(serverMapper::toNetworkDTO);
        return ResponseEntity.ok().body(response);
    }
    
    @GetMapping("/filters")
    public ResponseEntity<DayZFiltersDTO> fetchDayZFilters() {
        DayZFiltersDTO filters = new DayZFiltersDTO(DayZGameTags.values());
        return ResponseEntity.ok().body(filters);
    }
    
}
