package com.noadminabuse.alpha.utils;

import java.util.UUID;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.noadminabuse.alpha.errors.Unauthorized;
import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;

public class SecurityUtils {
    
    public static UUID getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    
        if (auth != null && auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)) {
            String uuidString = auth.getName();
            return UUID.fromString(uuidString);
        } else {
            throw new Unauthorized(AuthErrorMessage.UNAUTHENTICATED_REQUEST);
        }
    }
}
