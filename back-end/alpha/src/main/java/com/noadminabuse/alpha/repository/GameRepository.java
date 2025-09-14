package com.noadminabuse.alpha.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.Game;

public interface GameRepository extends JpaRepository<Game, UUID> {
    Optional<Game> findByName(String name);
}
