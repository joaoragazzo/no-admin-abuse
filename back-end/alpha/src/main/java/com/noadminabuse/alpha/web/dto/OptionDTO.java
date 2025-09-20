package com.noadminabuse.alpha.web.dto;

import java.util.UUID;

public record OptionDTO(
    UUID value,
    String label
) {}
