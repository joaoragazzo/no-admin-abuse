package com.noadminabuse.alpha.service;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.GameErrorMessage;
import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.repository.GameRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GameService {
    
    private final GameRepository gameRepository;

    public Game getGameByName(String name) {
        return gameRepository.findByName(name).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );
    }

    @PostConstruct
    @Transactional
    private void initDefaultTranslation() {
        if (gameRepository.count() == 0) {
            Game g = new Game();
            g.setName("DAYZ");
            gameRepository.save(g);
        }
    }
}
