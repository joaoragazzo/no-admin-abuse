package com.noadminabuse.alpha.errors.enums;

public enum ErrorMessages {
    NETWORK_NOT_FOUND("NETWORK_NOT_FOUND");

    private String message;
    ErrorMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
