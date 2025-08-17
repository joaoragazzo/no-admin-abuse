package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum ReviewErrorMessage implements Feedback {
    REVIEW_ALREADY_EXISTS("REVIEW_ALREADY_EXISTS");

    private String message;
    ReviewErrorMessage(String message) { 
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
