package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.List;

import com.noadminabuse.alpha.model.GameplayTag;
import com.noadminabuse.alpha.model.GameplayTagAlias;
import com.noadminabuse.alpha.web.dto.gameplay.GameplayTagAliasDTO;
import com.noadminabuse.alpha.web.dto.gameplay.GameplayTagDTO;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ScrappingMapper {
    
    public GameplayTagDTO toGameplayTagDTO(GameplayTag entity) {
        return new GameplayTagDTO(
            entity.getId(), 
            entity.getSlug(), 
            ScrappingMapper.toGameplayTagAliasDTO(entity.getAlias())
        );
    }

    public List<GameplayTagDTO> toGameplayTagDTO(List<GameplayTag> entities) {
        List<GameplayTagDTO> result = new ArrayList<>();

        for (GameplayTag entity : entities) {
            result.add(ScrappingMapper.toGameplayTagDTO(entity));
        }

        return result;
    }

    public GameplayTagAliasDTO toGameplayTagAliasDTO(GameplayTagAlias entity) {
        return new GameplayTagAliasDTO(entity.getId(), entity.getAlias());
    }

    public List<GameplayTagAliasDTO> toGameplayTagAliasDTO(List<GameplayTagAlias> entities) {
        List<GameplayTagAliasDTO> result = new ArrayList<>();

        for (GameplayTagAlias entity : entities) {
            result.add(ScrappingMapper.toGameplayTagAliasDTO(entity));
        }

        return result;
    }
}
