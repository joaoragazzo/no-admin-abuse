package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.web.dto.OptionDTO;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

public interface GameRepository extends JpaRepository<Game, UUID> {
    Optional<Game> findBySlug(String slug);

    @Query("""
        SELECT new com.noadminabuse.alpha.web.dto.game.GameBannerDTO(
            g.name,
            g.slug,
            (SELECT COUNT(DISTINCT n.id) FROM Network n WHERE n.game = g),
            (SELECT COUNT(DISTINCT s.id) FROM Server s WHERE s.network.game = g),
            (SELECT COUNT(r.id) FROM Review r WHERE r.network.game = g)
        )
        FROM Game g
    """)
    List<GameBannerDTO> getAllGameBannerDTOs();


    @Query("""
        SELECT new com.noadminabuse.alpha.web.dto.OptionDTO(
            g.id,
            g.name
        )
        FROM Game g
    """)
    List<OptionDTO> getAllGameOptionsDTOs();

}
