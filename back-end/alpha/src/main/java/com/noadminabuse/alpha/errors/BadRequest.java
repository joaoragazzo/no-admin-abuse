package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.messages.Feedback;

public class BadRequest extends RuntimeException {
    public BadRequest(Feedback message) {
        super(message.getMessage());
    }
}
