package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.messages.Feedback;

public class Conflict extends RuntimeException {
    public Conflict(Feedback message) {
        super(message.getMessage());
    }
}
