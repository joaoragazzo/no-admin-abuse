package com.noadminabuse.alpha.errors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.web.dto.MessageDTO;

import lombok.AllArgsConstructor;

@RestControllerAdvice
@AllArgsConstructor
public class GlobalExceptionHandler {
    private final FeedbackMapper feedbackMapper;

    @ExceptionHandler(NotFound.class)
    public ResponseEntity<MessageDTO> handleNotFound(NotFound ex) {
        MessageDTO error = feedbackMapper.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(BadRequest.class)
    public ResponseEntity<MessageDTO> handleBadRequest(BadRequest ex) {
        MessageDTO error = feedbackMapper.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UnprocessableEntity.class)
    public ResponseEntity<MessageDTO> handleUnprocessableEntity(UnprocessableEntity ex) {
        MessageDTO error = feedbackMapper.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(error);
    }

    @ExceptionHandler(Unauthorized.class)
    public ResponseEntity<MessageDTO> handleUnauthorized(Unauthorized ex) {
        MessageDTO error = feedbackMapper.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(Conflict.class) 
    public ResponseEntity<MessageDTO> handleConflict(Conflict ex) {
        MessageDTO error = feedbackMapper.error(ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }
}
