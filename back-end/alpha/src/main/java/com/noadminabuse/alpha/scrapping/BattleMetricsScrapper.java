package com.noadminabuse.alpha.scrapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.config.client.BattleMetricsClient;
import com.noadminabuse.alpha.config.client.dto.battlemetrics.ServerData;
import com.noadminabuse.alpha.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.mapper.NetworkMapper;
import com.noadminabuse.alpha.web.dto.network.NetworkCreationDTO;
import com.noadminabuse.alpha.web.dto.server.ServerDTO;


@Component
public class BattleMetricsScrapper {
    private final BattleMetricsClient battleMetricsClient;
    private final DayZServerParser dayZServerParser;

    public BattleMetricsScrapper(BattleMetricsClient battleMetricsClient) {
        this.battleMetricsClient = battleMetricsClient;
        this.dayZServerParser = new DayZServerParser();
    }

    public List<NetworkCreationDTO> run() {
        List<ServerData> servers = battleMetricsClient.fetchServers("dayz", 1000).data();
        HashMap<String, List<ServerData>> networks = agroupServers(servers);
        return processToDto(networks);
    } 

    private HashMap<String, List<ServerData>> agroupServers(List<ServerData> servers) {
        HashMap<String, List<ServerData>> networks = new HashMap<>();
        
        for(ServerData server : servers) {
            String cannonicalName = dayZServerParser.processCanonicalName(server.attributes().name());
            
            if (networks.containsKey(cannonicalName)) {
                networks.get(cannonicalName).add(server);
            } else {
                ArrayList<ServerData> serverList = new ArrayList<>();
                serverList.add(server);
                networks.put(cannonicalName, serverList);
            }
        }

        return networks;
    }

    private List<NetworkCreationDTO> processToDto(HashMap<String, List<ServerData>> networks) {
        List<NetworkCreationDTO> result = new ArrayList<>();
        
        for(String key : networks.keySet()) {
            List<ServerDTO> servers = new ArrayList<>();

            for(ServerData serverData : networks.get(key)) {
                List<DayZGameTags> tags = dayZServerParser.extractDayZGameTags(serverData.attributes().name());
                ServerDTO serverDTO = NetworkMapper.toServerDTO(null, serverData, tags);
                servers.add(serverDTO);
            }

            if (!(Objects.isNull(key) || key.isEmpty() || key.isBlank()))
                result.add(new NetworkCreationDTO(null, key, servers));
        }

        return result;
    }
}

