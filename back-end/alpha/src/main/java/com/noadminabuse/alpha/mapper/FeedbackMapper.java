package com.noadminabuse.alpha.mapper;

import com.noadminabuse.alpha.enums.FeedbackType;
import com.noadminabuse.alpha.messages.Feedback;
import com.noadminabuse.alpha.web.dto.MessageDTO;

import lombok.experimental.UtilityClass;

@UtilityClass
public class FeedbackMapper {
    
    public MessageDTO error(String message) {
        return new MessageDTO(message, FeedbackType.ERROR);
    }

    public MessageDTO success(Feedback message) {
        return new MessageDTO(message.getMessage(), FeedbackType.SUCCESS);
    }

    public MessageDTO warning(Feedback message) {
        return new MessageDTO(message.getMessage(), FeedbackType.WARNING);
    }

    public MessageDTO info(Feedback message) { 
        return new MessageDTO(message.getMessage(), FeedbackType.INFO);
    }
}
