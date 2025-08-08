package com.noadminabuse.alpha.web.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @GetMapping("/steam")
    public ResponseEntity<?> steamLogin() {
        String steamOpenIdUrl = authService.buildSteamOpenIdUrl();
    
        return ResponseEntity
            .status(HttpStatus.FOUND)
            .location(URI.create(steamOpenIdUrl))
            .build();
    }

    @GetMapping("/steam/callback")
    public ResponseEntity<SuccessLoginDTO> steamCallback(HttpServletRequest request) {
        SuccessLoginDTO successLoginDTO = authService.confirmSteamLogin(request);
        return ResponseEntity.ok(successLoginDTO);
    }

    @GetMapping("/steam/profile")
    public ResponseEntity<SuccessLoginDTO> fetchUserInfo() {
        String steamId = SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getName();
        // TODO: Make a refresh token for security
        SuccessLoginDTO successLoginDTO = authService.refreshSteamLogin(steamId);
        return ResponseEntity.ok(successLoginDTO);
    }
    
}
