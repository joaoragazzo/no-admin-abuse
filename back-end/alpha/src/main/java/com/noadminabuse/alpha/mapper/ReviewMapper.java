package com.noadminabuse.alpha.mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;
import com.noadminabuse.alpha.web.dto.user.UserBasicInfoDTO;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ReviewMapper {
    
    private final NetworkTagMapper networkTagMapper;
    private final UserMapper userMapper;

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
            review.isAnonymous() ? null : userMapper.toUserBasicInfoDTO(review.getAuthor()),
            review.isAnonymous(),
            review.getText(),
            review.getRating(),
            review.getCreatedAt(),
            review.getLikedByUsers().stream().anyMatch(user -> user.getId().equals(userId)),
            review.getLikedByUsers().size(),
            networkTagMapper.toNetworkTagDTO(review.getTags())
        );
    }

    public ReviewDisplayResponseDTO toReviewDisplayResponse(ReviewDisplayDTO ownReview, Page<ReviewDisplayDTO> reviews) {
        return new ReviewDisplayResponseDTO(ownReview, reviews);
    } 
}
