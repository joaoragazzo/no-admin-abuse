package com.noadminabuse.alpha.messages;

public enum NetworkTagsMessage implements Feedback {
    SUCCESS_DELETED_NETWORK_TAG("SUCCESS_DELETED_NETWORK_TAG");

    String message;
    NetworkTagsMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    
}
