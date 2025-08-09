package com.noadminabuse.alpha.components;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.web.dto.feedback.ErrorDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    private final FeedbackMapper feedbackMapper;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request,
    HttpServletResponse response,
    AuthenticationException authenticationException) throws IOException {
        ErrorDTO error = feedbackMapper.toErrorDTO(authenticationException.getMessage());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        objectMapper.writeValue(response.getWriter(), error);
        response.getWriter().flush();
    }
}
