package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.NetworkErrorMessage;
import com.noadminabuse.alpha.mapper.NetworkMapper;
import com.noadminabuse.alpha.model.Country;
import com.noadminabuse.alpha.model.Server;
import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.enums.CountryCode;
import com.noadminabuse.alpha.model.enums.dayz.DayZGameTags;
import com.noadminabuse.alpha.model.enums.Region;
import com.noadminabuse.alpha.repository.NetworkRepository;
import com.noadminabuse.alpha.repository.ServerRepository;
import com.noadminabuse.alpha.specification.ServerSearchSpecification;
import com.noadminabuse.alpha.web.dto.ServerDTO;
import com.noadminabuse.alpha.web.dto.NetworkDTO;
import com.noadminabuse.alpha.web.dto.NetworkDetailsDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NetworkService {
    private final ServerRepository serverRepository;
    private final CountryService countryService;
    private final NetworkRepository networkRepository;
    private final NetworkMapper networkMapper;

    public Server createServer(UUID groupId, ServerDTO serverDTO) {
        Country country = countryService.findOrCreate(serverDTO.country());
        
        Server server = networkMapper.toServerEntity(serverDTO, country);
        Network network = networkRepository
            .findById(groupId)
            .orElseThrow(
                () -> new NotFound(NetworkErrorMessage.NETWORK_NOT_FOUND)
            );
        server.setNetwork(network);
        return serverRepository.save(server);
    }

    public List<Server> createServer(UUID groupId, List<ServerDTO> serverDTOs) {
        List<CountryCode> countryCodes = serverDTOs
            .stream()
            .map(ServerDTO::country)
            .toList();

        countryService.findOrCreate(countryCodes);
        
        Network network = networkRepository
            .findById(groupId)
            .orElseThrow(
                () -> new NotFound(NetworkErrorMessage.NETWORK_NOT_FOUND)
            );

        List<Server> servers = serverDTOs.stream().map(
            dto -> {
                Country c = new Country(dto.country());
                Server server = networkMapper.toServerEntity(dto, c);
                server.setNetwork(network);
                return server;
            }
        ).toList();

        return serverRepository.saveAll(servers);
    }

    public Network createNetwork(NetworkDTO networkDTOs) {
        Network network = networkRepository.save(new Network(networkDTOs.name()));
        this.createServer(network.getId(), networkDTOs.servers());
        return network;
    }

    public List<Network> createNetwork(List<NetworkDTO> networkDTOss) {
        return networkDTOss
            .stream()
            .map(this::createNetwork).toList();
    }

    public Page<Network> findAll(Integer page, Integer size, List<DayZGameTags> tags, String search, Region region) {
        Pageable pageagle = PageRequest.of(page, size);
        Specification<Network> spec = Specification
            .where(ServerSearchSpecification.hasTags(tags))
            .and(ServerSearchSpecification.hasSearch(search))
            .and(ServerSearchSpecification.hasRegion(region))
            .and(ServerSearchSpecification.withPopularityOrder());

        return networkRepository.findAll(spec, pageagle);
    }

    public NetworkDetailsDTO fetchNetworkDetails(UUID id) {
        Network network = networkRepository
            .findById(id)
            .orElseThrow(
                () -> new NotFound(NetworkErrorMessage.NETWORK_NOT_FOUND)
            );
        return networkMapper.toNetworkDetailsDTO(network);
    }
}
