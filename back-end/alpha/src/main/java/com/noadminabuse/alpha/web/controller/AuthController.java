package com.noadminabuse.alpha.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.noadminabuse.alpha.service.JwtService;
import com.noadminabuse.alpha.service.SteamAuthService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    
    private final SteamAuthService steamAuthService;
    private final JwtService jwtService;

    @GetMapping("/steam")
    public ResponseEntity<?> steamLogin() {
        String steamOpenIdUrl = steamAuthService.buildSteamOpenIdUrl();
    
        return ResponseEntity.ok(Map.of(
            "success", true,
            "redirectUrl", steamOpenIdUrl,
            "message", "Redirecione o usuário para esta URL"
        ));
        
    }

    @GetMapping("/callback")
    public ResponseEntity<?> steamCallback(HttpServletRequest request) {
        try {
            // Verificar se a resposta da Steam é válida
            String steamId = steamAuthService.verifySteamResponse(request);
            
            if (steamId == null || steamId.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "success", false,
                        "error", "Steam ID não encontrado na resposta"
                    ));
            }
            
            // Gerar JWT token
            String jwt = jwtService.generateToken(steamId);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "token", jwt,
                "user", Map.of(
                    "steamId", steamId
                ),
                "message", "Login realizado com sucesso"
            ));
            
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of(
                    "success", false,
                    "error", "Dados inválidos da Steam",
                    "details", e.getMessage()
                ));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "success", false,
                    "error", "Falha na autenticação Steam",
                    "details", e.getMessage()
                ));
        }
    }
    
    // Endpoint para validar token JWT
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                        "success", false,
                        "error", "Token não fornecido ou formato inválido"
                    ));
            }
            
            String token = authHeader.substring(7); // Remove "Bearer "
            String steamId = jwtService.extractSteamId(token);
            
            if (jwtService.isTokenValid(token)) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "valid", true,
                    "steamId", steamId,
                    "message", "Token válido"
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of(
                        "success", false,
                        "valid", false,
                        "error", "Token inválido ou expirado"
                    ));
            }
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                    "success", false,
                    "valid", false,
                    "error", "Erro ao validar token",
                    "details", e.getMessage()
                ));
        }
    }
    
    // Endpoint para logout (opcional - invalidar token no frontend)
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Como JWT é stateless, o "logout" é feito no frontend removendo o token
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Logout realizado. Remova o token do cliente."
        ));
    }
    
    
    // Endpoint para debug (apenas desenvolvimento)
    @GetMapping("/debug")
    public ResponseEntity<?> debugSteamCallback(HttpServletRequest request) {
        Map<String, String> params = new HashMap<>();
        
        // Capturar todos os parâmetros da request
        request.getParameterMap().forEach((key, values) -> {
            params.put(key, String.join(",", values));
        });
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "parameters", params,
            "message", "Parâmetros recebidos da Steam"
        ));
    }
    
    

}
