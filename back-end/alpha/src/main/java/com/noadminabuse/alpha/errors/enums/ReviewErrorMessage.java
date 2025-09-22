package com.noadminabuse.alpha.errors.enums;

import com.noadminabuse.alpha.messages.Feedback;

public enum ReviewErrorMessage implements Feedback {
    REVIEW_ALREADY_EXISTS("review_already_exists"),
    REVIEW_NOT_FOUND("review_not_found"),
    CANNOT_DELETE_THIS_REVIEW("cannot_delete_this_review");

    private String message;
    ReviewErrorMessage(String message) { 
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
