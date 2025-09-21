package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;

public interface NetworkTagRepository extends JpaRepository<NetworkTag, UUID> {
    
    @Query("SELECT nt FROM NetworkTag nt JOIN FETCH nt.game")
    List<NetworkTag> findAllWithGames();

    @Query("SELECT nt FROM NetworkTag nt WHERE nt.tagSlug = :tagSlug")
    Optional<NetworkTag> findByTagSlug(@Param("tagSlug") String tagSlug);

    @Query("""
        SELECT new 
            com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO(
                nt.id,
                nt.tagSlug,
                nt.isPositive
            )
        FROM NetworkTag nt
        JOIN nt.game g
        WHERE g.slug = :gameSlug
    """)
    List<NetworkTagDTO> findAllBasicInfoDTOsByGameSlug(@Param("gameSlug") String gameSlug);
}
