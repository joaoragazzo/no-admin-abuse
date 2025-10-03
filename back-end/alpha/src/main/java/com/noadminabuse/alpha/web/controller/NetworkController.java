package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.NetworkMapper;
import com.noadminabuse.alpha.mapper.NetworkTagMapper;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.service.ReviewService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.controller.docs.NetworkApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.dayz.SearchFilterDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkBannerDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkDetailsDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@AllArgsConstructor
@RequestMapping("/networks")
public class NetworkController extends BaseController implements NetworkApi {
    private final NetworkService networkService;
    private final ReviewService reviewService;
    private final NetworkTagService networkTagService;

    @GetMapping("/{networkId}")
    public ApiResponseDTO<NetworkDetailsDTO> fetchNetworkDetails(@PathVariable("networkId") UUID id) {
        Network network = networkService.fetchNetworkDetails(id);
        List<ReviewStatsDTO> stats = reviewService.getReviewStats(id); 
        Set<NetworkTagDTO> tags = NetworkTagMapper.toNetworkTagDTO(networkTagService.findTagsToApplyForNetwork(id));
        NetworkDetailsDTO response = NetworkMapper.toNetworkDetailsDTO(network, stats, tags); 
        return ok(response);
    }
    
    @PostMapping("/")
    public ApiResponseDTO<Page<NetworkBannerDTO>> fetchAllServers(@RequestBody @Valid SearchFilterDTO filter) {
        Page<Network> networks = networkService.findAll(
            filter.page(), 
            filter.size(), 
            filter.tags(), 
            filter.search(),
            filter.region(),
            filter.gameSlug()
        );
        Page<NetworkBannerDTO> response = networks.map(NetworkMapper::toNetworkBanner);
        return ok(response);
    }

    @GetMapping("/{networkId}/reviews")
    public ApiResponseDTO<ReviewDisplayResponseDTO> getReview(@PathVariable UUID networkId) {
        
        if (SecurityUtils.isLogged()) {
            UUID userId = SecurityUtils.getCurrentUserId();
            return ok(reviewService.getAllReviewsDisplay(networkId, userId, 0));
        }

        return ok(reviewService.getAllReviewsDisplay(networkId, 0));
    }
    

}
