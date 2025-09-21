package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.web.dto.game.GameInfoDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

@Component
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

    public List<NetworkTagInfoDTO> toNetworkTagInfoDTO(List<NetworkTag> entities) {
        List<NetworkTagInfoDTO> result = new ArrayList<>();

        for (NetworkTag entity : entities) {
            result.add(this.toNetworkTagInfoDTO(entity));
        }

        return result;
    }
}
