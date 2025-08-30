package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum TranslationErrorMessage implements Feedback{
    TRANSLATION_NOT_FOUND("TRANSLATION_NOT_FOUND");

    String message;
    TranslationErrorMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
