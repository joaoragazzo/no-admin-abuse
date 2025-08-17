package com.noadminabuse.alpha.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.Review;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    
    Optional<Review> findByNetworkIdAndAuthorId(UUID networkId, UUID authorId);
}
