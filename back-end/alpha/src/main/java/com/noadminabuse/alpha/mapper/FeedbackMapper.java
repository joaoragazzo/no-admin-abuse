package com.noadminabuse.alpha.mapper;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.web.dto.feedback.ErrorDTO;

@Component
public class FeedbackMapper {
    
    public ErrorDTO toErrorDTO(String message) {
        return new ErrorDTO(message, Instant.now());
    }
}
