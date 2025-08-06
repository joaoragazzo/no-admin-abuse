package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.web.dto.NetworkDetailsDTO;

import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@AllArgsConstructor
@RequestMapping("/network")
public class NetworkController {
    private final NetworkService networkService;

    @GetMapping("/{id}")
    public ResponseEntity<NetworkDetailsDTO> fetchNetworkDetails(@PathVariable("id") UUID id) {
        NetworkDetailsDTO response = networkService.fetchNetworkDetails(id);
        return ResponseEntity.ok().body(response);
    }    

}
