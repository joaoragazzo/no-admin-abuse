package com.noadminabuse.alpha.web.dto.feedback;

import java.time.Instant;

public record ErrorDTO(
    String message,
    Instant timestamp
) {}
