package com.noadminabuse.alpha.config.security;

import java.io.IOException;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.service.JwtService;
import com.noadminabuse.alpha.service.UserService;

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
    private final UserService userService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        
        if (!Objects.isNull(authHeader) && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String userId = jwtService.extractUserId(token);
            User user = userService.getUser(UUID.fromString(userId));
            
            try {
                if (jwtService.isTokenValid(token)) {
                    Collection<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                        .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                            userId, 
                            null, 
                            authorities
                        );
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            } catch (ExpiredJwtException e) {
                jwtAuthEntryPoint.commence(request, response, new AuthenticationException(AuthErrorMessage.EXPIRED_JWT.getMessage()) {});
                return;
            } catch (Exception e) {
                jwtAuthEntryPoint.commence(request, response, new AuthenticationException(AuthErrorMessage.INVALID_JWT.getMessage()) {});
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
