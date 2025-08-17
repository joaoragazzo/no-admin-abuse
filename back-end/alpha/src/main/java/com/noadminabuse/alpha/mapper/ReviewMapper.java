package com.noadminabuse.alpha.mapper;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.ReviewDTO;
import com.noadminabuse.alpha.web.dto.ReviewDisplayDTO;
import com.noadminabuse.alpha.web.dto.auth.UserBasicInfoDTO;

@Component
public class ReviewMapper {
    
    public Review toReviewEntity(ReviewDTO dto, UUID authorUuid, UUID networkUuid) {
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
}
