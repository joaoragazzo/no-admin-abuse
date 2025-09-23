package com.noadminabuse.alpha.web.dto;

import com.noadminabuse.alpha.enums.FeedbackType;

public record MessageDTO(
    String message,
    FeedbackType type
) {}
