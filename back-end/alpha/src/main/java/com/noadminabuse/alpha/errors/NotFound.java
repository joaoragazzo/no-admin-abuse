package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.messages.Feedback;

public class NotFound extends RuntimeException {
    public NotFound(Feedback message) {
        super(message.getMessage());
    }
}
