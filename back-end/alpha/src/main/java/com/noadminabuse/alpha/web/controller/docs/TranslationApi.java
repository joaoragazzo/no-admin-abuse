package com.noadminabuse.alpha.web.controller.docs;

import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Tradução de conteúdo")
public interface TranslationApi {

    @Operation(summary = "Retorna a tradução de um namespace")
    @Parameters({
        @Parameter(name = "lang", description = "Tag ISO 639"),
        @Parameter(name = "namespace", description = "O namespace do idioma")
    })
    public ApiResponseDTO<Map<String,String>> getLanguage(@PathVariable String lang, @PathVariable String namespace);
}
