package com.noadminabuse.alpha.errors.enums;

public enum UserErrorMessage implements ErrorMessage {
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
