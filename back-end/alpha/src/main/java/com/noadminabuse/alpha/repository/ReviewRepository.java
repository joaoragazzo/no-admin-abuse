package com.noadminabuse.alpha.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.noadminabuse.alpha.model.Review;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    
    @EntityGraph(attributePaths = {"author"})
    Optional<Review> findByNetworkIdAndAuthorId(UUID networkId, UUID authorId);

    @EntityGraph(attributePaths = {"author"})
    Page<Review> findByNetworkIdAndAuthorIdNot(UUID networkId, UUID authorId, Pageable pageable);


}
