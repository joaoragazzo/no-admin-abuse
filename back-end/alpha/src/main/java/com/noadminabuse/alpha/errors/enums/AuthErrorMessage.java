package com.noadminabuse.alpha.errors.enums;

public enum AuthErrorMessage implements ErrorMessage{
    INVALID_STEAM_RESPONSE("INVALID_STEAM_RESPONSE"),
    INVALID_STEAM_ID("INVALID_STEAM_ID"),
    COULD_NOT_CONFIRM_OPENID_SIGNATURE("COULD_NOT_CONFIRM_OPENID_SIGNATURE"),
    INVALID_JWT("INVALID_JWT"),
    EXPIRED_JWT("EXPIRED_JWT")
    ;


    private String message;
    AuthErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
