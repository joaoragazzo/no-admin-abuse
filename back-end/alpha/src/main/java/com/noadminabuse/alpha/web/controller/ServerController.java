package com.noadminabuse.alpha.web.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.ServerMapper;
import com.noadminabuse.alpha.model.ServerGroup;
import com.noadminabuse.alpha.service.ServerService;
import com.noadminabuse.alpha.web.dto.ServerGroupDTO;

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
    private final ServerService serversService;
    private final ServerMapper serverMapper;

    @PutMapping("/bulk")
    public ResponseEntity<String> bulk(@RequestBody List<ServerGroupDTO> dto) {
        serversService.createServerGroup(dto);
        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/")
    public ResponseEntity<Page<ServerGroupDTO>> fetchAllServers(
        @RequestParam(defaultValue = "0") Integer page,
        @RequestParam(defaultValue = "10") Integer size
    ) {
        Page<ServerGroup> servers = serversService.findAll(page, size);
        Page<ServerGroupDTO> response = servers.map(serverMapper::toServerGroupDTO);
        return ResponseEntity.ok().body(response);
    }
    
}
