package com.noadminabuse.alpha.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.GameErrorMessage;
import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.repository.GameRepository;
import com.noadminabuse.alpha.web.dto.OptionDTO;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GameService {
    
    private final GameRepository gameRepository;

    public Game getGameBySlug(String slug) {
        return gameRepository.findBySlug(slug).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );
    }

    public List<GameBannerDTO> getAllGamesBanner() {
        return gameRepository.getAllGameBannerDTOs();
    }

    public List<OptionDTO> getAllGamesOptions() {
        return gameRepository.getAllGameOptionsDTOs();
    }

}
