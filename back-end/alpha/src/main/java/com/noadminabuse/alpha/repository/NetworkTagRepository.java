package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;

public interface NetworkTagRepository extends JpaRepository<NetworkTag, UUID> {
    
    @Query("SELECT nt FROM NetworkTag nt JOIN FETCH nt.game")
    List<NetworkTag> findAllWithGames();

    @Query("SELECT nt FROM NetworkTag nt WHERE nt.slug = :slug")
    Optional<NetworkTag> findByTagSlug(@Param("slug") String slug);

    @Query("""
        SELECT new 
            com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO(
                nt.id,
                nt.slug,
                nt.isPositive
            )
        FROM NetworkTag nt
        JOIN nt.game g
        WHERE g.slug = :gameSlug
    """)
    List<NetworkTagDTO> findAllBasicInfoDTOsByGameSlug(@Param("gameSlug") String gameSlug);

    @Query("""
       SELECT COUNT(nt) 
       FROM NetworkTag nt 
       JOIN nt.game g 
       WHERE nt.id IN :tagsIds AND g.id = :gameId
    """)
    long countByIdAndGame(@Param("tagsIds") Set<UUID> tagsId, @Param("gameId") UUID gameId);

    @Query("""
        SELECT t
        FROM NetworkTag t
        JOIN t.reviews r
        WHERE r.network.id = :networkId
        GROUP BY t
        HAVING COUNT(r) >= :minReviews
        AND (COUNT(r) * 100.0 / (SELECT COUNT(r2) FROM Review r2 WHERE r2.network.id = :networkId)) >= :minPercentage
    """)
    List<NetworkTag> findTagsToApplyForNetwork(
        @Param("networkId") UUID networkId,
        @Param("minReviews") long minReviews,
        @Param("minPercentage") double minPercentage
    );

}
