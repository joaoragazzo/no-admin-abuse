package com.noadminabuse.alpha.messages;

public enum ReviewMessage implements Feedback {
    REVIEW_SUCCESS_POSTED("review_success_posted"),
    REVIEW_SUCCESS_DELETED("review_success_deleted"),
    REVIEW_LIKED_REVIEW("review_liked_review"),
    REVIEW_UNLIKED_REVIEW("review_unliked_review");

    private String message;
    ReviewMessage(String message) { 
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
    
}
