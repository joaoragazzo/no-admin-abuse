package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.NetworkMapper;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.service.ReviewService;
import com.noadminabuse.alpha.web.dto.dayz.SearchFilterDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkBannerDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkDetailsDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@AllArgsConstructor
@RequestMapping("/network")
public class NetworkController {
    private final NetworkService networkService;
    private final ReviewService reviewService;
    private final NetworkMapper networkMapper;

    @GetMapping("/{id}")
    public ResponseEntity<NetworkDetailsDTO> fetchNetworkDetails(@PathVariable("id") UUID id) {
        Network network = networkService.fetchNetworkDetails(id);
        List<ReviewStatsDTO> stats = reviewService.getReviewStats(id); 
        NetworkDetailsDTO response = networkMapper.toNetworkDetailsDTO(network, stats); 
        return ResponseEntity.ok().body(response);
    }
    
    @PostMapping("/")
    public ResponseEntity<Page<NetworkBannerDTO>> fetchAllServers(@RequestBody @Valid SearchFilterDTO filter) {
        Page<Network> networks = networkService.findAll(
            filter.page(), 
            filter.size(), 
            filter.tags(), 
            filter.search(),
            filter.region(),
            filter.game()
        );
        Page<NetworkBannerDTO> response = networks.map(networkMapper::toNetworkBanner);
        return ResponseEntity.ok().body(response);
    }


    

}
