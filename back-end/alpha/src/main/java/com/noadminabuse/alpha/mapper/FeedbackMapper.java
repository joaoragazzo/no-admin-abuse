package com.noadminabuse.alpha.mapper;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.messages.Feedback;
import com.noadminabuse.alpha.messages.MessageType;
import com.noadminabuse.alpha.web.dto.MessageDTO;

@Component
public class FeedbackMapper {
    
    public MessageDTO error(String message) {
        return new MessageDTO(message, MessageType.ERROR);
    }

    public MessageDTO success(Feedback message) {
        return new MessageDTO(message.getMessage(), MessageType.SUCCESS);
    }

    public MessageDTO warning(Feedback message) {
        return new MessageDTO(message.getMessage(), MessageType.WARNING);
    }

    public MessageDTO info(Feedback message) { 
        return new MessageDTO(message.getMessage(), MessageType.INFO);
    }
}
