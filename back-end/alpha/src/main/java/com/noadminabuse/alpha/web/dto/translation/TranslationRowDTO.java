package com.noadminabuse.alpha.web.dto.translation;

import java.util.Map;

public record TranslationRowDTO(
    String key,
    Map<String, TranslationCellDTO> translations
) {}
