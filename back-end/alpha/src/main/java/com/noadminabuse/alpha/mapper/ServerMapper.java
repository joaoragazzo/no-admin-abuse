package com.noadminabuse.alpha.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.ServerGroup;
import com.noadminabuse.alpha.web.dto.ServerDTO;
import com.noadminabuse.alpha.web.dto.ServerGroupDTO;

@Component
public class ServerMapper {
    
    public Server toServerEntity(ServerDTO serverDTO) {
        return new Server(
            serverDTO.id(),
            serverDTO.name(),
            serverDTO.ip(),
            serverDTO.port(),
            serverDTO.tags(),
            serverDTO.region()    
        );
    }

    public List<Server> toServerEntity(List<ServerDTO> serversDTO) {
        return serversDTO.stream().map(
            dto -> {
                return this.toServerEntity(dto);
            }
        ).toList(); 
    }

    public ServerDTO toServerDTO(Server entity) {
        return new ServerDTO(entity.getId(), 
            entity.getName(), 
            entity.getIp(), 
            entity.getPort(),
            entity.getTags(),
            entity.getRegion()
        );
    }

    public List<ServerDTO> toServerDTO(List<Server> entities) {
        return entities.stream().map(this::toServerDTO).toList();
    }

    public ServerGroupDTO toServerGroupDTO(ServerGroup entity) {
        List<ServerDTO> serverDTOs = this.toServerDTO(entity.getServers());
        return new ServerGroupDTO(entity.getId(), entity.getName(), serverDTOs);
    }

    public List<ServerGroupDTO> toServerGroupDTO(List<ServerGroup> entities) {
        return entities.stream().map(this::toServerGroupDTO).toList();
    }
    
}
