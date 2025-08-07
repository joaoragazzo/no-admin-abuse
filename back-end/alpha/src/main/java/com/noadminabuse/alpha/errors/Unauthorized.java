package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.errors.enums.ErrorMessage;

public class Unauthorized extends RuntimeException {
    public Unauthorized(ErrorMessage error) {
        super(error.getMessage());
    }
}
