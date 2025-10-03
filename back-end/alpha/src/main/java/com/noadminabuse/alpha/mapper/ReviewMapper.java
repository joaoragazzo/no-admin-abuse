package com.noadminabuse.alpha.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;

import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ReviewMapper {
    

    public Review toReviewCreationEntity(ReviewCreationDTO dto, UUID authorUuid, UUID networkUuid) {
        Set<NetworkTag> tags = new HashSet<>();
        for (UUID tagId : dto.tags()) {
            tags.add(new NetworkTag(tagId));
        }
        
        return new Review(
            dto.text(), 
            dto.rating(), 
            dto.anonymous(), 
            new User(authorUuid), 
            new Network(networkUuid),
            tags
        );
    }

    public ReviewDisplayDTO toReviewDisplayDTO(Review review, UUID userId) {
        return new ReviewDisplayDTO(
            review.getId(),
            review.isAnonymous() ? null : UserMapper.toUserBasicInfoDTO(review.getAuthor()),
            review.isAnonymous(),
            review.getText(),
            review.getRating(),
            review.getCreatedAt(),
            review.getLikedByUsers().stream().anyMatch(user -> user.getId().equals(userId)),
            review.getLikedByUsers().size(),
            NetworkTagMapper.toNetworkTagDTO(review.getTags())
        );
    }

    public ReviewDisplayResponseDTO toReviewDisplayResponse(ReviewDisplayDTO ownReview, Page<ReviewDisplayDTO> reviews) {
        return new ReviewDisplayResponseDTO(ownReview, reviews);
    } 
}
