package com.noadminabuse.alpha.mapper;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.Network;
import com.noadminabuse.alpha.model.Review;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.ReviewDTO;

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
}
