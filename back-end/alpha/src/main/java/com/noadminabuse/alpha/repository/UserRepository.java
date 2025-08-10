package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.User;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findBySteamId(String steamId);
}
