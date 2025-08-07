package com.noadminabuse.alpha.web.controller;

import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.errors.BadRequest;
import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;
import com.noadminabuse.alpha.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    
    private final AuthService steamAuthService;

    @GetMapping("/steam")
    public ResponseEntity<?> steamLogin() {
        String steamOpenIdUrl = steamAuthService.buildSteamOpenIdUrl();
    
        return ResponseEntity
            .status(HttpStatus.FOUND)
            .location(URI.create(steamOpenIdUrl))
            .build();
    }

    @GetMapping("/steam/callback")
    public ResponseEntity<SuccessLoginDTO> steamCallback(HttpServletRequest request) {
        try {
            SuccessLoginDTO successLoginDTO = steamAuthService.confirmSteamLogin(request);
            return ResponseEntity.ok(successLoginDTO);
        } catch (IllegalArgumentException e) {
            throw new BadRequest(AuthErrorMessage.INVALID_STEAM_RESPONSE);
        } 
    }

}
