package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.errors.enums.ErrorMessage;

public class BadRequest extends RuntimeException {
    public BadRequest(ErrorMessage message) {
        super(message.getMessage());
    }
}
