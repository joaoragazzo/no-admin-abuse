package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.ServerGroup;

public interface ServerGroupRepository extends JpaRepository<ServerGroup, UUID> {
   
    @Query("SELECT g FROM ServerGroup g LEFT JOIN g.servers s GROUP BY g ORDER BY COUNT(s) DESC")
    Page<ServerGroup> findAllOrderByServerCountDest(Pageable pageable);
}
