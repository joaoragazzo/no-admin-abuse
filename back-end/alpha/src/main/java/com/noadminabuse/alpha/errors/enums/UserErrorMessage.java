package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum UserErrorMessage implements Feedback {
    USER_NOT_FOUND("USER_NOT_FOUND");

    private String message;
    UserErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
