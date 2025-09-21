package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum NetworkTagErrorMessage implements Feedback {
    NETWORK_TAG_ALREADY_EXISTS("NETWORK_TAG_ALREADY_EXISTS");

    String message;
    NetworkTagErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    
}
