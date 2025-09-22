package com.noadminabuse.alpha.messages;

public enum UserMessage implements Feedback {
    SUCCESS_ACCEPTED_EULA("success_appted_eula");

    private String message;
    UserMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
