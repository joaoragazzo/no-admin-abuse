package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.messages.Feedback;

public class Unauthorized extends RuntimeException {
    public Unauthorized(Feedback error) {
        super(error.getMessage());
    }
}
