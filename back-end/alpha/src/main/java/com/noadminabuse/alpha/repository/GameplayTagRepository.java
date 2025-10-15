package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.noadminabuse.alpha.model.GameplayTag;

@Repository
public interface GameplayTagRepository extends JpaRepository<GameplayTag, UUID>{
    
    @EntityGraph(attributePaths = {"alias"})
    @Query("SELECT gt FROM GameplayTag gt WHERE gt.game.id = :id ORDER BY gt.position")
    List<GameplayTag> findByGameSlugWithAliases(@Param("id") UUID id);
}
