package com.noadminabuse.alpha.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.Server;

public interface ServerRepository extends JpaRepository<Server, UUID> {
    
    @Query("SELECT SUM(s.onlinePlayers) FROM Server s")
    public Long countAllOnlyPlayers();

    Optional<Server> findByBattleMetricsId(String battleMetricsId);
}
