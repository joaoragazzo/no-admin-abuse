package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.errors.enums.ErrorMessages;

public class NotFound extends RuntimeException {
    public NotFound(ErrorMessages message) {
        super(message.getMessage());
    }
}
