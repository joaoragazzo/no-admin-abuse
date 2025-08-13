package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.UserService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.dto.MessageDTO;

import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    
    private final UserService userService;

    @PostMapping("/consent")
    public ResponseEntity<MessageDTO> consentEula() {
        UUID uuid = SecurityUtils.getCurrentUserId();
        MessageDTO message = userService.userConsentEula(uuid);

        return ResponseEntity.ok(message);
    }
    
}
