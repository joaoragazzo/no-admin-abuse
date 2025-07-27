package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.ServerGroupNotFound;
import com.noadminabuse.alpha.mapper.ServerMapper;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.ServerGroup;
import com.noadminabuse.alpha.repository.ServerGroupRepository;
import com.noadminabuse.alpha.repository.ServerRepository;
import com.noadminabuse.alpha.web.dto.ServerDTO;
import com.noadminabuse.alpha.web.dto.ServerGroupDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ServerService {
    private final ServerRepository serverRepository;
    private final ServerGroupRepository serverGroupRepository;
    private final ServerMapper serverMapper;

    public Server createServer(UUID groupId, ServerDTO serverDTO) {
        Server server = serverMapper.toServerEntity(serverDTO);
        ServerGroup group = serverGroupRepository.findById(groupId).orElseThrow(ServerGroupNotFound::new);
        server.setGroup(group);
        return serverRepository.save(server);
    }

    public List<Server> createServer(UUID groupId, List<ServerDTO> serverDTOs) {
        ServerGroup group = serverGroupRepository.findById(groupId).orElseThrow(ServerGroupNotFound::new);

        List<Server> servers = serverDTOs.stream().map(
            dto -> {
                Server server = serverMapper.toServerEntity(dto);
                server.setGroup(group);
                return server;
            }
        ).toList();

        return serverRepository.saveAll(servers);
    }

    public ServerGroup createServerGroup(ServerGroupDTO serverGroupDTO) {
        ServerGroup serverGroup = serverGroupRepository.save(new ServerGroup(serverGroupDTO.name()));
        this.createServer(serverGroup.getId(), serverGroupDTO.servers());
        return serverGroup;
    }

    public List<ServerGroup> createServerGroup(List<ServerGroupDTO> serverGroupDTOs) {
        return serverGroupDTOs.stream().map(
            dto -> {
                return this.createServerGroup(dto);
            }
        ).toList();
    }

    public Page<ServerGroup> findAll(Integer page, Integer size) {
        Pageable pageagle = PageRequest.of(page, size);
        return serverGroupRepository.findAllOrderByServerCountDest(pageagle);
    }
}
