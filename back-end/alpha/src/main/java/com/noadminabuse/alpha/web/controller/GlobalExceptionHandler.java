package com.noadminabuse.alpha.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.web.dto.feedback.ErrorDTO;

import lombok.AllArgsConstructor;

@RestControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {
    private final FeedbackMapper feedbackMapper;

    @ExceptionHandler(NotFound.class)
    public ResponseEntity<ErrorDTO> handleNetworkNotFound(NotFound ex) {
        ErrorDTO error = feedbackMapper.toErrorDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
