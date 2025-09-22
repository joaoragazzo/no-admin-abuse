package com.noadminabuse.alpha.messages;

public enum NetworkTagsMessage implements Feedback {
    SUCCESS_DELETED_NETWORK_TAG("success_deleted_message");

    String message;
    NetworkTagsMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    
}
