package com.noadminabuse.alpha.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.web.dto.feedback.ErrorDTO;

import lombok.AllArgsConstructor;

@RestControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {
    private final FeedbackMapper feedbackMapper;

    @ExceptionHandler(NotFound.class)
    public ResponseEntity<ErrorDTO> handleNotFound(NotFound ex) {
        ErrorDTO error = feedbackMapper.toErrorDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<ErrorDTO> handleBadRequest(BadRequest ex) {
        ErrorDTO error = feedbackMapper.toErrorDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UnprocessableEntity.class)
    public ResponseEntity<ErrorDTO> handleUnprocessableEntity(UnprocessableEntity ex) {
        ErrorDTO error = feedbackMapper.toErrorDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
    }

    @ExceptionHandler(Unauthorized.class)
    public ResponseEntity<ErrorDTO> handleUnauthorized(Unauthorized ex) {
        ErrorDTO error = feedbackMapper.toErrorDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
}
