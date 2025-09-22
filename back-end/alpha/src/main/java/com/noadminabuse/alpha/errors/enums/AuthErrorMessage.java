package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum AuthErrorMessage implements Feedback{
    INVALID_STEAM_RESPONSE("invalid_steam_response"),
    INVALID_STEAM_ID("invalid_steam_id"),
    COULD_NOT_CONFIRM_OPENID_SIGNATURE("could_not_confirm_openid_signature"),
    INVALID_JWT("invalid_jwt"),
    EXPIRED_JWT("expired_jwt"),
    UNAUTHENTICATED_REQUEST("unauthenticated_request");



    private String message;
    AuthErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
