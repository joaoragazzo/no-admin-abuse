package com.noadminabuse.alpha.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.mapper.ScrappingMapper;
import com.noadminabuse.alpha.repository.GameplayTagRepository;
import com.noadminabuse.alpha.web.dto.gameplay.GameplayTagDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScrappingService {
    private final GameplayTagRepository gameplayTagRepository;
        
    public List<GameplayTagDTO> getAllGameplayTags() {
        return ScrappingMapper.toGameplayTagDTO(gameplayTagRepository.findAll());
    }

}
