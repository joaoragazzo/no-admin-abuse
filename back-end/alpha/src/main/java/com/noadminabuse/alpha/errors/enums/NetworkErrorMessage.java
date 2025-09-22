package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum NetworkErrorMessage implements Feedback{
    NETWORK_NOT_FOUND("network_not_found");

    private String message;
    NetworkErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
