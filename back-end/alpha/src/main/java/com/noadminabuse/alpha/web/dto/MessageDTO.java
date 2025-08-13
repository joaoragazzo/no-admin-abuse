package com.noadminabuse.alpha.web.dto;

import com.noadminabuse.alpha.messages.MessageType;

public record MessageDTO(
    String message,
    MessageType type
) {}
