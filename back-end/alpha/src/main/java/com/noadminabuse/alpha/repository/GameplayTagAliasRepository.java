package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noadminabuse.alpha.model.GameplayTagAlias;

@Repository
public interface GameplayTagAliasRepository extends JpaRepository<GameplayTagAlias, UUID>{
    
}
