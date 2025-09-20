package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.NetworkTag;

public interface NetworkTagRepository extends JpaRepository<NetworkTag, UUID> {
    
}
