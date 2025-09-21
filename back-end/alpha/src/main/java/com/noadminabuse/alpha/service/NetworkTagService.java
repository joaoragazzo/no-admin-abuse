package com.noadminabuse.alpha.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.Conflict;
import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.GameErrorMessage;
import com.noadminabuse.alpha.errors.enums.NetworkTagErrorMessage;
import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.repository.GameRepository;
import com.noadminabuse.alpha.repository.NetworkTagRepository;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NetworkTagService {
    private final NetworkTagRepository networkTagRepository;
    private final GameRepository gameRepository;
    private final TranslationService translationService;

    public NetworkTag createNewTag(String tagSlug, boolean isPositive, UUID uuid) {
        if (networkTagRepository.findByTagSlug(tagSlug).isPresent()) {
            throw new Conflict(NetworkTagErrorMessage.NETWORK_TAG_ALREADY_EXISTS);
        }
        
        Game game = gameRepository.findById(uuid).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );

        String treatedSlug = tagSlug.replace(" ", "_");

        NetworkTag tag = new NetworkTag(treatedSlug, isPositive, game);
        translationService.createNewKey("network_tag." + game.getSlug() + "." + treatedSlug);
        
        return networkTagRepository.save(tag);
    }

    public List<NetworkTagDTO> getAllTagsByGame(String gameSlug) {
        return networkTagRepository.findAllBasicInfoDTOsByGameSlug(gameSlug);
    }

    public List<NetworkTag> getAllTags() {
        //TODO: Make it pageable
        
        return networkTagRepository.findAll();
    }

}
