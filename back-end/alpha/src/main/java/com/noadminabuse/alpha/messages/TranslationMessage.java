package com.noadminabuse.alpha.messages;

public enum TranslationMessage implements Feedback {
    TRANSLATION_SUCCESS_SAVED("translation_success_saved");

    String message;
    TranslationMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
