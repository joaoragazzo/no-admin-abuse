package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;
import com.noadminabuse.alpha.service.DebugService;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;

import lombok.AllArgsConstructor;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@Profile("dev")
@RequestMapping("/debug")
public class DebugController extends BaseController {

    private final DebugService debugService;

    @GetMapping("/ping")
    public ApiResponseDTO<String> getMethodName() {
        return ok("pong");
    }

    @GetMapping("/token")
    public ApiResponseDTO<SuccessLoginDTO> generateAdminToken() {
        SuccessLoginDTO response = debugService.generateSteamLoginBySteamId("76561198118616961");
        return ok(response);
    }
    
    
}
