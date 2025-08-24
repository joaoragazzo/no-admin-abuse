package com.noadminabuse.alpha.job;

import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.scrapping.BattleMetricsScrapper;
import com.noadminabuse.alpha.service.NetworkService;
import com.noadminabuse.alpha.web.dto.network.NetworkCreationDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServerScrappingJob {
    
    private final NetworkService networkService;
    private final BattleMetricsScrapper battleMetricsScrapper;

    @Scheduled(fixedRate = 70000)
    public void dayZScrapping() {
        System.out.println("Inicando cronjob...");
        List<NetworkCreationDTO> networks = battleMetricsScrapper.run();
        networkService.createOrUpdateNetworks(networks);
        System.out.println("Finalizando cronjob...");
    }
}
