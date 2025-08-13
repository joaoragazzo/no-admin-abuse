package com.noadminabuse.alpha.mapper;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.messages.MessageType;
import com.noadminabuse.alpha.web.dto.MessageDTO;

@Component
public class FeedbackMapper {
    
    public MessageDTO error(String message) {
        return new MessageDTO(message, MessageType.ERROR);
    }

    public MessageDTO success(String message) {
        return new MessageDTO(message, MessageType.SUCCESS);
    }

    public MessageDTO warning(String message) {
        return new MessageDTO(message, MessageType.WARNING);
    }

    public MessageDTO info(String message) { 
        return new MessageDTO(message, MessageType.INFO);
    }
}
