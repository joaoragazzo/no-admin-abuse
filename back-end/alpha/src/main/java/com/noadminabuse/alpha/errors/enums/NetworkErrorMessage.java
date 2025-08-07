package com.noadminabuse.alpha.errors.enums;

public enum NetworkErrorMessage implements ErrorMessage{
    NETWORK_NOT_FOUND("NETWORK_NOT_FOUND");

    private String message;
    NetworkErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
