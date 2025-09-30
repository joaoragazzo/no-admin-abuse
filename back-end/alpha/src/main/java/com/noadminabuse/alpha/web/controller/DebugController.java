package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.enums.Role;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.service.DebugService;
import com.noadminabuse.alpha.service.UserService;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;

import lombok.AllArgsConstructor;

import java.util.List;


import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@AllArgsConstructor
@Profile("dev")
@RequestMapping("/debug")
public class DebugController extends BaseController {

    private final DebugService debugService;
    private final UserService userService;

    @GetMapping("/ping")
    public ApiResponseDTO<String> getMethodName() {
        return ok("pong");
    }

    @GetMapping("/token")
    public ApiResponseDTO<SuccessLoginDTO> generateAdminToken() {
        SuccessLoginDTO response = debugService.generateSteamLoginBySteamId("76561198118616961");
        return ok(response);
    }
    
    @GetMapping("/roles")
    public ApiResponseDTO<String> getUserRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();  
        List<String> roles = authentication.getAuthorities().stream()
            .map(authority -> {
                System.out.println("Authority: " + authority.getAuthority() + " (class: " + authority.getClass().getSimpleName() + ")");
                return authority.getAuthority();
            })
            .toList();
        
        return ok(roles.toString());
    }
    
    @GetMapping("/user-info")
    public ApiResponseDTO<String> getUserInfo() {
    try {
        User user = userService.getUserBySteamId("76561198118616961");
        
        StringBuilder info = new StringBuilder();
        info.append("User ID: ").append(user.getId()).append("\n");
        info.append("Username: ").append(user.getUsername()).append("\n");
        info.append("Steam ID: ").append(user.getSteamId()).append("\n");
        info.append("Roles: ").append(user.getRoles()).append("\n");
        info.append("Roles count: ").append(user.getRoles().size()).append("\n");
        
        for (Role role : user.getRoles()) {
            info.append("Role: ").append(role.name())
                .append(" -> Authority: ").append(role.getAuthority()).append("\n");
        }
        
        return ok(info.toString());
    } catch (Exception e) {
        return ok("Erro: " + e.getMessage());
    }
}
    
}
