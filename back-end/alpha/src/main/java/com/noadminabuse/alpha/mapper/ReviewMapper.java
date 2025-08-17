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
        return Review.builder()
                .author(new User(authorUuid))
                .network(new Network(networkUuid))
                .rating(dto.rating())
                .text(dto.text())
                .build();
    }
}
