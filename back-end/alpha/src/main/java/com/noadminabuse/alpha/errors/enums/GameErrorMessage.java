package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum GameErrorMessage implements Feedback {
    GAME_NOT_FOUND("GAME_NOT_FOUND");

    String message;
    GameErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
