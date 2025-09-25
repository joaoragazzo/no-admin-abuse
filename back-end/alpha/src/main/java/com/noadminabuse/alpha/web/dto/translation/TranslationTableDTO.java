package com.noadminabuse.alpha.web.dto.translation;

import java.util.List;

public record TranslationTableDTO(
    List<String> langs,
    List<String> namespaces,
    List<TranslationRowDTO> content 
) {}
