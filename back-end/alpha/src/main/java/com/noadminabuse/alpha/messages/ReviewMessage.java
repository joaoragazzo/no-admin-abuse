package com.noadminabuse.alpha.messages;

public enum ReviewMessage implements Feedback {
    REVIEW_SUCCESS_POSTED("REVIEW_SUCCESS_POSTED"),
    REVIEW_SUCCESS_DELETED("REVIEW_SUCCESS_DELETED");

    private String message;
    ReviewMessage(String message) { 
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
