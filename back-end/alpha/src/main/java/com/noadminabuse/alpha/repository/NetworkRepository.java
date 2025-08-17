package com.noadminabuse.alpha.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.noadminabuse.alpha.model.Network;

public interface NetworkRepository extends JpaRepository<Network, UUID>, JpaSpecificationExecutor<Network> {

}
