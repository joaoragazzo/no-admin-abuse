package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.NetworkTag;

public interface NetworkTagRepository extends JpaRepository<NetworkTag, UUID> {
    
    @Query("SELECT nt FROM NetworkTag nt JOIN FETCH nt.game")
    List<NetworkTag> findAllWithGames();
}
