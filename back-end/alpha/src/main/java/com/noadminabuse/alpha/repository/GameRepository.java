package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.Game;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

public interface GameRepository extends JpaRepository<Game, UUID> {
    Optional<Game> findBySlug(String slug);

    @Query("""
        SELECT new com.noadminabuse.alpha.web.dto.game.GameBannerDTO(
            g.name,
            g.slug,
            COUNT(DISTINCT n.id),
            COUNT(DISTINCT s.id),
            COUNT(r.id)
        )
            FROM Game g
            LEFT JOIN g.networks n
            LEFT JOIN n.servers s
            LEFT JOIN n.reviews r
            GROUP BY g.id, g.name
    """)
    List<GameBannerDTO> getAllGameBannerDTOs();

}
