package com.noadminabuse.alpha.web.dto.translation;

import java.util.List;

public record TranslationTableDTO(
    List<String> langs,
    List<TranslationRowDTO> content 
) {}
