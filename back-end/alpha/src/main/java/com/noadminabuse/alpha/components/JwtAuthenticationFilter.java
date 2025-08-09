package com.noadminabuse.alpha.components;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;
import com.noadminabuse.alpha.service.JwtService;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final JwtService jwtService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        
        if (!Objects.isNull(authHeader) && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                if (jwtService.isTokenValid(token)) {
                    String steamId = jwtService.extractSteamId(token);
                    UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                            steamId, 
                            token, 
                            List.of()
                        );
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (ExpiredJwtException e) {
                jwtAuthEntryPoint.commence(request, response, new AuthenticationException(AuthErrorMessage.EXPIRED_JWT.getMessage()) {});
            } catch (Exception e) {
                jwtAuthEntryPoint.commence(request, response, new AuthenticationException(AuthErrorMessage.INVALID_JWT.getMessage()) {});
            }
        }

        filterChain.doFilter(request, response);
    }
}
