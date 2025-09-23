package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.messages.UserMessage;
import com.noadminabuse.alpha.service.UserService;
import com.noadminabuse.alpha.utils.SecurityUtils;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

import lombok.AllArgsConstructor;

import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController extends BaseController {
    
    private final UserService userService;

    @PostMapping("/consent")
    public ApiResponseDTO<Void> consentEula() {
        UUID uuid = SecurityUtils.getCurrentUserId();
        userService.userConsentEula(uuid);
        return success(UserMessage.SUCCESS_ACCEPTED_EULA);
    }
    
}
