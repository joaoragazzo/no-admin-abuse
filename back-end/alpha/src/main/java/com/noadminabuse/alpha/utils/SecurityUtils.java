package com.noadminabuse.alpha.utils;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    
    public static UUID getCurrentUserId() {
        String uuidString = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        return UUID.fromString(uuidString);
    }
}
