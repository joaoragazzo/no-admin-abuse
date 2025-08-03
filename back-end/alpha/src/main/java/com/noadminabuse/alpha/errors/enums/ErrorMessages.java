package com.noadminabuse.alpha.errors.enums;

public enum ServerMessageErrors {
    NETWORK_NOT_FOUND("NETWORK_NOT_FOUND");

    private String message;
    ServerMessageErrors(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
