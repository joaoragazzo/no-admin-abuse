package com.noadminabuse.alpha.web.dto.translation;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TranslationUpdateDTO(
    @NotNull UUID id,
    @NotBlank String value
) {}
