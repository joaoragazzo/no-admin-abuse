package com.noadminabuse.alpha.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public NetworkTag createTag(String tagSlug, boolean isPositive, UUID gameId) {
        if (networkTagRepository.findByTagSlug(tagSlug).isPresent()) {
            throw new Conflict(NetworkTagErrorMessage.NETWORK_TAG_ALREADY_EXISTS);
        }
        
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );

        String treatedSlug = tagSlug.replace(" ", "_");
        NetworkTag tag = new NetworkTag(treatedSlug, isPositive, game);
        
        translationService.createNewKey("network_tag", game.getSlug() + "." + treatedSlug);
        
        return networkTagRepository.save(tag);
    }

    @Transactional
    public void deleteTag(UUID gameId, UUID tagId) {
        
        Game game = gameRepository.findById(gameId).orElseThrow(
            () -> new NotFound(GameErrorMessage.GAME_NOT_FOUND)
        );
        
        NetworkTag networkTag = networkTagRepository.findById(tagId).orElseThrow(
            () -> new NotFound(NetworkTagErrorMessage.NETWORK_TAG_NOT_FOUND)
        );

        networkTagRepository.deleteById(tagId);
        translationService.deleteAllWithKey("network_tag." + game.getSlug() + "." + networkTag.getSlug());
    }

    public List<NetworkTagDTO> getAllTagsByGame(String gameSlug) {
        return networkTagRepository.findAllBasicInfoDTOsByGameSlug(gameSlug);
    }

    public void ensureAllTagsExists(Set<UUID> tagsId, UUID gameId) {
        long existingTags = networkTagRepository.countByIdAndGame(tagsId, gameId);
        
        if (existingTags != tagsId.size()) 
            throw new NotFound(NetworkTagErrorMessage.NETWORK_TAG_NOT_FOUND);
    }

    public Set<NetworkTag> findTagsToApplyForNetwork(
        UUID networkId
    ) {
        return new HashSet<>(networkTagRepository.findTagsToApplyForNetwork(
            networkId,
            1,
            30.0
        ));
    }

    public Set<NetworkTag> getAllTags() {
        //TODO: Make it pageable
        
        return new HashSet<>(networkTagRepository.findAll());
    }

}
