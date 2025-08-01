package com.noadminabuse.alpha.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.web.dto.ServerDTO;
import com.noadminabuse.alpha.web.dto.NetworkDTO;

@Component
public class ServerMapper {
    
    public Server toServerEntity(ServerDTO serverDTO, Country country) {        
        return new Server(
            serverDTO.id(),
            serverDTO.name(),
            serverDTO.ip(),
            serverDTO.port(),
            serverDTO.tags(),
            country,
            serverDTO.maxPlayers(),
            serverDTO.onlinePlayers()
        );
    }

    public ServerDTO toServerDTO(Server entity) {

        return new ServerDTO(entity.getId(), 
            entity.getName(), 
            entity.getIp(), 
            entity.getPort(),
            entity.getTags(),
            entity.getCountry().getCode(),
            entity.getMaxPlayers(),
            entity.getOnlinePlayers()
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

}
