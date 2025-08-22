package com.noadminabuse.alpha.scrapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.config.client.BattleMetricsClient;
import com.noadminabuse.alpha.config.client.dto.battlemetrics.ServerData;
import com.noadminabuse.alpha.mapper.NetworkMapper;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.web.dto.network.NetworkDTO;
import com.noadminabuse.alpha.web.dto.server.ServerDTO;


@Component
public class BattleMetricsScrapper {
    private final BattleMetricsClient battleMetricsClient;
    private final DayZServerParser dayZServerParser;
    private final NetworkMapper networkMapper;

    public BattleMetricsScrapper(BattleMetricsClient battleMetricsClient, NetworkMapper networkMapper) {
        this.battleMetricsClient = battleMetricsClient;
        this.dayZServerParser = new DayZServerParser();
        this.networkMapper = networkMapper;
    }

    public List<NetworkDTO> run() {
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

    private List<NetworkDTO> processToDto(HashMap<String, List<ServerData>> networks) {
        List<NetworkDTO> result = new ArrayList<>();
        
        for(String key : networks.keySet()) {
            List<ServerDTO> servers = new ArrayList<>();

            for(ServerData serverData : networks.get(key)) {
                List<DayZGameTags> tags = dayZServerParser.extractDayZGameTags(serverData.attributes().name());
                ServerDTO serverDTO = networkMapper.toServerDTO(null, serverData, tags);
                servers.add(serverDTO);
            }

            if (!(Objects.isNull(key) || key.isEmpty() || key.isBlank()))
                result.add(new NetworkDTO(null, key, servers));
        }

        return result;
    }
}

