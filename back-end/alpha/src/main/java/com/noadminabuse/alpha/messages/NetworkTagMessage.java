package com.noadminabuse.alpha.messages;

public enum NetworkTagMessage implements Feedback {
    SUCCESS_DELETED_NETWORK_TAG("success_deleted_network_tag"),
    SUCCESS_CREATED_NETWORK_TAG("success_created_network_tag");

    String message;
    NetworkTagMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    
}
