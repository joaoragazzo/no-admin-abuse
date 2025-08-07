package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.errors.enums.ErrorMessage;

public class UnprocessableEntity extends RuntimeException {
    public UnprocessableEntity(ErrorMessage message) {
        super(message.getMessage());
    }
}
