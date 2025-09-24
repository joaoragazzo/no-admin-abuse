package com.noadminabuse.alpha.web.controller;

import java.net.URI;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.noadminabuse.alpha.web.controller.docs.AuthApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.service.AuthService;
import com.noadminabuse.alpha.utils.SecurityUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController extends BaseController implements AuthApi {
    
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
    public ApiResponseDTO<SuccessLoginDTO> steamCallback(HttpServletRequest request) {
        SuccessLoginDTO successLoginDTO = authService.confirmSteamLogin(request);
        return ok(successLoginDTO);
    }

    @GetMapping("/steam/profile")
    public ApiResponseDTO<SuccessLoginDTO> fetchUserInfo() {
        UUID uuid = SecurityUtils.getCurrentUserId();
        
        // TODO: Make a refresh token for security
        SuccessLoginDTO successLoginDTO = authService.refreshSteamLogin(uuid);
        return ok(successLoginDTO);
    }
    
}
