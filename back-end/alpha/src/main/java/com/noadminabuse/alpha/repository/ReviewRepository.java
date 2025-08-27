package com.noadminabuse.alpha.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    
    @EntityGraph(attributePaths = {"author"})
    Optional<Review> findByNetworkIdAndAuthorId(UUID networkId, UUID authorId);

    @EntityGraph(attributePaths = {"author"})
    Page<Review> findByNetworkIdAndAuthorIdNot(UUID networkId, UUID authorId, Pageable pageable);

    @EntityGraph(attributePaths = {"author"})
    Page<Review> findByNetworkId(UUID networkId, Pageable pageable);

    Boolean existsByIdAndAuthorId(UUID id, UUID authorId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.network.id = :networkId")
    Double getAvgRatingByNetwork(UUID networkId);

    @Query("SELECT COUNT(r) FROM Review r WHERE r.network.id = :networkId")
    Long getReviewCountByNetwork(UUID networkId);


    @Query("SELECT new com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO(r.rating, COUNT(r)) " +
       "FROM Review r " +
       "WHERE r.network.id = :networkId " +
       "GROUP BY r.rating " +
       "ORDER BY r.rating")
    List<ReviewStatsDTO> getReviewStats(@Param("networkId") UUID networkId);
}
