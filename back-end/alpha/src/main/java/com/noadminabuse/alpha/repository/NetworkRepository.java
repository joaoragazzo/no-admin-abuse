package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.noadminabuse.alpha.model.Network;

public interface NetworkRepository extends JpaRepository<Network, UUID>, JpaSpecificationExecutor<Network> {
   
    @Query("SELECT g FROM ServerGroup g LEFT JOIN g.servers s GROUP BY g ORDER BY COUNT(s) DESC")
    Page<Network> findAllOrderByServerCountDest(Pageable pageable);
}
