package com.noadminabuse.alpha.errors;

import com.noadminabuse.alpha.errors.enums.ServerMessageErrors;

public class ServerGroupNotFound extends RuntimeException {
    public ServerGroupNotFound() {
        super(ServerMessageErrors.GROUP_NOT_FOUND.getMessage());
    }
}
