package com.noadminabuse.alpha.config.client;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.noadminabuse.alpha.config.client.dto.battlemetrics.BattleMetricsResponse;
import com.noadminabuse.alpha.config.client.dto.battlemetrics.ServerData;

@Component
public class BattleMetricsClient {
    
    private final WebClient webClient;

    public BattleMetricsClient() {
        this.webClient = WebClient.builder()
            .build();
    }

    public BattleMetricsResponse fetchServers(String game, Integer size) {
        List<ServerData> result = new ArrayList<>();
        Integer totalFetched = 0;
        String nextUrl = "https://api.battlemetrics.com/servers?filter[game]=" + game + "&page[size]=" + Math.min(100, size);
        
        while (nextUrl != null && totalFetched < size) {
            BattleMetricsResponse response = webClient.get()
                .uri(URI.create(nextUrl))
                .retrieve()
                .bodyToMono(BattleMetricsResponse.class)
                .block();

            result.addAll(response.data());
            totalFetched += response.data().size();
            nextUrl = response.links() != null ? response.links().next() : null;
        }

        return new BattleMetricsResponse(result, null);
    }


}
