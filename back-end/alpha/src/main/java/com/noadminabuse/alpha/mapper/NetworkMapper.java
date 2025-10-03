package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.noadminabuse.alpha.config.client.dto.battlemetrics.ServerData;
import com.noadminabuse.alpha.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.web.dto.network.NetworkBannerDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkCreationDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkDetailsDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;
import com.noadminabuse.alpha.web.dto.server.ServerDTO;

import lombok.experimental.UtilityClass;

@UtilityClass
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
        return entities.stream().map(NetworkMapper::toServerDTO).toList();
    }

    public NetworkCreationDTO toNetworkDTO(Network entity) {
        List<ServerDTO> serverDTOs = NetworkMapper.toServerDTO(entity.getServers());
        return new NetworkCreationDTO(entity.getId(), entity.getName(), serverDTOs);
    }

    public NetworkBannerDTO toNetworkBanner(Network entity) {
        List<ServerDTO> serverDTOs = NetworkMapper.toServerDTO(entity.getServers());
        return new NetworkBannerDTO(
            entity.getId(), 
            entity.getName(), 
            entity.getDescription(),
            entity.getReviewsAmount(),
            entity.getReviewsAvg(),
            serverDTOs);
    }

    public List<NetworkCreationDTO> toNetworkDTO(List<Network> entities) {
        return entities.stream().map(NetworkMapper::toNetworkDTO).toList();
    }

    public NetworkDetailsDTO toNetworkDetailsDTO(Network network, List<ReviewStatsDTO> stats, Set<NetworkTagDTO> tags) {
        List<ServerDTO> servers = NetworkMapper.toServerDTO(network.getServers());
        
        return new NetworkDetailsDTO(
            network.getId(),
            network.getName(),
            network.getDescription(),
            network.getReviewsAmount(),
            network.getReviewsAvg(),
            stats,
            tags, 
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

    public List<NetworkCreationDTO> toNetworkDTO(HashMap<String, List<ServerDTO>> servers) {
        ArrayList<NetworkCreationDTO> networks = new ArrayList<>();
        for(String key : servers.keySet()) {   
            NetworkCreationDTO networkDTO = new NetworkCreationDTO(null, key, servers.get(key));
            networks.add(networkDTO);
        }
        return networks;
    }
}
