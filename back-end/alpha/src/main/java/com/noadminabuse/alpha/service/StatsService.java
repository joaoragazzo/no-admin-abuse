package com.noadminabuse.alpha.service;


import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.repository.NetworkRepository;
import com.noadminabuse.alpha.repository.ReviewRepository;
import com.noadminabuse.alpha.repository.ServerRepository;
import com.noadminabuse.alpha.web.dto.stats.HomepageStatsDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StatsService {
    private final ReviewRepository reviewRepository;
    private final NetworkRepository networkRepository;
    private final ServerRepository serverRepository;

    public HomepageStatsDTO fetchHomepageStats() {
        Long totalReviews = reviewRepository.count();
        Long totalNetworks = networkRepository.count();
        Long totalServers = serverRepository.count();

        return new HomepageStatsDTO(
            totalReviews,
            totalServers,
            totalNetworks
        );
    }
}
