package com.noadminabuse.alpha.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.noadminabuse.alpha.common.ApiResponseFactory;
import com.noadminabuse.alpha.enums.FeedbackType;
import com.noadminabuse.alpha.messages.Feedback;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

public abstract class BaseController {

    protected <T> ApiResponseDTO<T> ok(T data) {
        return ApiResponseFactory.ok(data);
    }
    
    protected <T> ApiResponseDTO<T> success(T data, Feedback feedback) {
        return ApiResponseFactory.success(data, feedback);
    }
    
    protected ApiResponseDTO<Void> ok() {
        return ApiResponseFactory.ok();
    }
    
    protected ApiResponseDTO<Void> success(Feedback feedback) {
        return ApiResponseFactory.success(feedback);
    }
    
    protected ApiResponseDTO<Void> info(Feedback feedback) {
        return ApiResponseFactory.info(feedback);
    }
    
    protected ApiResponseDTO<Void> warning(Feedback feedback) {
        return ApiResponseFactory.warning(feedback);
    }
    
    protected ApiResponseDTO<Void> error(Feedback feedback) {
        return ApiResponseFactory.error(feedback);
    }

    protected <T> ResponseEntity<ApiResponseDTO<T>> response(HttpStatus status, T data) {
        return ResponseEntity.status(status).body(ApiResponseFactory.ok(data));
    }
    
    protected <T> ResponseEntity<ApiResponseDTO<T>> response(HttpStatus status, T data, Feedback feedback, FeedbackType type) {
        return ResponseEntity.status(status).body(new ApiResponseDTO<>(data, feedback.getMessage(), type));
    }
    
    protected ResponseEntity<ApiResponseDTO<Void>> response(HttpStatus status, Feedback feedback, FeedbackType type) {
        return ResponseEntity.status(status).body(new ApiResponseDTO<>(null, feedback.getMessage(), type));
    }
}
