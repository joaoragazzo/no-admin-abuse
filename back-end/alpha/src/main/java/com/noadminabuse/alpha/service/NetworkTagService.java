package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.GameErrorMessage;
import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.repository.GameRepository;
import com.noadminabuse.alpha.repository.NetworkTagRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NetworkTagService {
    private final NetworkTagRepository networkTagRepository;
    private final GameRepository gameRepository;
    private final TranslationService translationService;

    public NetworkTag createNewTag(String tagSlug, boolean isPositive, UUID uuid) {
        Game game = gameRepository.findById(uuid).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );
        NetworkTag tag = new NetworkTag(tagSlug, isPositive, game);
        translationService.createNewKey(game.getSlug() + ".network_tag." + tagSlug);
        
        return networkTagRepository.save(tag);
    }

    public List<NetworkTag> getAllTags() {
        //TODO: Make it pageable
        
        return networkTagRepository.findAll();
    }

}
