package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum NetworkTagErrorMessage implements Feedback {
    NETWORK_TAG_ALREADY_EXISTS("network_tag_already_exists"),
    NETWORK_TAG_NOT_FOUND("network_tag_not_found");

    String message;
    NetworkTagErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    
}
