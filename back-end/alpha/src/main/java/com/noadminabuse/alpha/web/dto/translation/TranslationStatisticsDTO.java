package com.noadminabuse.alpha.web.dto.translation;

public record TranslationStatisticsDTO(
    Integer namespacesCount,
    Integer totalKeys,
    Integer completedTranslations,
    Integer pendingTranslations
) {}
