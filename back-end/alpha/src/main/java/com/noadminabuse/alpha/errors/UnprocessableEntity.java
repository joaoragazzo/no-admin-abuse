package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.messages.Feedback;

public class UnprocessableEntity extends RuntimeException {
    public UnprocessableEntity(Feedback message) {
        super(message.getMessage());
    }
}
