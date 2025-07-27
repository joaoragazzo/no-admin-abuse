package com.noadminabuse.alpha.errors.enums;

public enum ServerMessageErrors {
    GROUP_NOT_FOUND("SERVER_GROUP_NOT_FOUND");

    private String message;
    ServerMessageErrors(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
