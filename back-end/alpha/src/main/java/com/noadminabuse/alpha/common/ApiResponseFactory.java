package com.noadminabuse.alpha.common;

import com.noadminabuse.alpha.enums.FeedbackType;
import com.noadminabuse.alpha.messages.Feedback;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

public class ApiResponseFactory {

    public static <T> ApiResponseDTO<T> ok(T data) {
        return new ApiResponseDTO<>(data, null, null);
    }
    
    public static <T> ApiResponseDTO<T> success(T data, Feedback feedback) {
        return new ApiResponseDTO<>(data, feedback.getMessage(), FeedbackType.SUCCESS);
    }
    
    public static ApiResponseDTO<Void> ok() {
        return new ApiResponseDTO<>(null, null, null);
    }
    
    public static ApiResponseDTO<Void> success(Feedback feedback) {
        return new ApiResponseDTO<>(null, feedback.getMessage(), FeedbackType.SUCCESS);
    }
    
    public static ApiResponseDTO<Void> info(Feedback feedback) {
        return new ApiResponseDTO<>(null, feedback.getMessage(), FeedbackType.INFO);
    }
    
    public static ApiResponseDTO<Void> warning(Feedback feedback) {
        return new ApiResponseDTO<>(null, feedback.getMessage(), FeedbackType.WARNING);
    }
    
    public static ApiResponseDTO<Void> error(Feedback feedback) {
        return new ApiResponseDTO<>(null, feedback.getMessage(), FeedbackType.ERROR);
    }

}

