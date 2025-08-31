package com.noadminabuse.alpha.web.dto.translation;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TranslationDetailsDTO(
    @NotNull UUID id,
    @NotNull @NotBlank String lang,
    @NotNull @NotBlank String tKey,
    @NotNull @NotBlank String tValue
) {}
