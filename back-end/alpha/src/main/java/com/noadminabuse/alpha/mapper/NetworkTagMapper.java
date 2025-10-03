package com.noadminabuse.alpha.mapper;

import java.util.HashSet;
import java.util.Set;

import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.web.dto.game.GameInfoDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

import lombok.experimental.UtilityClass;

@UtilityClass
public class NetworkTagMapper {
    
    public NetworkTagInfoDTO toNetworkTagInfoDTO(NetworkTag entity) {
        return new NetworkTagInfoDTO(
            entity.getId(),
            entity.getSlug(),
            entity.isPositive(),
            new GameInfoDTO(
                entity.getGame().getId(), 
                entity.getGame().getName(), 
                entity.getGame().getSlug()
            )
        );
    }

    public Set<NetworkTagInfoDTO> toNetworkTagInfoDTO(Set<NetworkTag> entities) {
        HashSet<NetworkTagInfoDTO> result = new HashSet<>();

        for (NetworkTag entity : entities) {
            result.add(NetworkTagMapper.toNetworkTagInfoDTO(entity));
        }

        return result;
    }

    public NetworkTagDTO toNetworkTagDTO(NetworkTag entity) {
        return new NetworkTagDTO(
            entity.getId(), 
            entity.getSlug(),
            entity.isPositive()
        );
    }

    public Set<NetworkTagDTO> toNetworkTagDTO(Set<NetworkTag> entities) {
        Set<NetworkTagDTO> result = new HashSet<>();

        for (NetworkTag entity : entities) {
            result.add(NetworkTagMapper.toNetworkTagDTO(entity));
        }
        return result;
    }
}
