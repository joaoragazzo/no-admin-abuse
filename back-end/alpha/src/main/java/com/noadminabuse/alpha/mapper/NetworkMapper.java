package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.config.client.dto.battlemetrics.ServerData;
import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.web.dto.network.NetworkDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkDetailsDTO;
import com.noadminabuse.alpha.web.dto.server.ServerDTO;

@Component
public class NetworkMapper {
    
    public Server toServerEntity(ServerDTO serverDTO, Country country) {        
        return new Server(
            serverDTO.id(),
            serverDTO.name(),
            serverDTO.ip(),
            serverDTO.port(),
            serverDTO.tags(),
            country,
            serverDTO.maxPlayers(),
            serverDTO.onlinePlayers(),
            serverDTO.battlemetricsId()
        );
    }

    public ServerDTO toServerDTO(Server entity) {
        return new ServerDTO(
            entity.getId(), 
            entity.getName(), 
            entity.getIp(), 
            entity.getPort(),
            entity.getTags(),
            entity.getCountry().getCode(),
            entity.getMaxPlayers(),
            entity.getOnlinePlayers(),
            entity.getBattleMetricsId()
        );
    }

    public List<ServerDTO> toServerDTO(List<Server> entities) {
        return entities.stream().map(this::toServerDTO).toList();
    }

    public NetworkDTO toNetworkDTO(Network entity) {
        List<ServerDTO> serverDTOs = this.toServerDTO(entity.getServers());
        return new NetworkDTO(entity.getId(), entity.getName(), serverDTOs);
    }

    public List<NetworkDTO> toNetworkDTO(List<Network> entities) {
        return entities.stream().map(this::toNetworkDTO).toList();
    }

    public NetworkDetailsDTO toNetworkDetailsDTO(Network network) {
        List<ServerDTO> servers = this.toServerDTO(network.getServers());
        
        return new NetworkDetailsDTO(
            network.getId(),
            network.getName(),
            network.getDescription(), 
            new ArrayList<>(), 
            new ArrayList<>(), 
            servers, 
            network.getDiscord(), 
            network.getInstagram(), 
            network.getYoutube(),
            network.getWebsite()
        );
    }

    public ServerDTO toServerDTO(UUID id, ServerData server, List<DayZGameTags> tags) {
        return new ServerDTO(
            id, 
            server.attributes().name(), 
            server.attributes().ip(), 
            server.attributes().port(), 
            tags, 
            server.attributes().country(), 
            server.attributes().maxPlayers(), 
            server.attributes().players(), 
            server.id()
        );
    }

    public List<NetworkDTO> toNetworkDTO(HashMap<String, List<ServerDTO>> servers) {
        ArrayList<NetworkDTO> networks = new ArrayList<>();
        for(String key : servers.keySet()) {   
            NetworkDTO networkDTO = new NetworkDTO(null, key, servers.get(key));
            networks.add(networkDTO);
        }
        return networks;
    }
}
