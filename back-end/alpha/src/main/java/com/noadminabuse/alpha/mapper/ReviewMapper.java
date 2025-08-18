package com.noadminabuse.alpha.mapper;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;
import com.noadminabuse.alpha.web.dto.user.UserBasicInfoDTO;

@Component
public class ReviewMapper {
    
    public Review toReviewCreationEntity(ReviewCreationDTO dto, UUID authorUuid, UUID networkUuid) {
        return new Review(
            dto.text(), 
            dto.rating(), 
            dto.anonymous(), 
            new User(authorUuid), 
            new Network(networkUuid)
        );
    }

    public ReviewDisplayDTO toReviewDisplayDTO(Review review, UserBasicInfoDTO author) {
        return new ReviewDisplayDTO(
            review.getId(),
            author,
            review.isAnonymous(),
            review.getText(),
            review.getRating(),
            review.getCreatedAt()
        );
    }

    public ReviewDisplayResponseDTO toReviewDisplayResponse(ReviewDisplayDTO ownReview, Page<ReviewDisplayDTO> reviews) {
        return new ReviewDisplayResponseDTO(ownReview, reviews);
    } 
}
