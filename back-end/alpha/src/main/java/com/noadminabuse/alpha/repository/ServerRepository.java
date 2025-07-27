package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.Server;

public interface ServerRepository extends JpaRepository<Server, UUID> {
    
}
