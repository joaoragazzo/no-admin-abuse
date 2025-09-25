package com.noadminabuse.alpha.web.controller.admin.docs;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationDetailsDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationStatisticsDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationTableDTO;
import com.noadminabuse.alpha.web.dto.translation.TranslationUpdateDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Idiomas e traduções")
public interface TranslationAdminApi {
    @Operation(summary = "Retorna todas as estatísticas das traduções atuais")
    public ApiResponseDTO<TranslationStatisticsDTO> getStats();

    @Operation(summary = "Retorna a tabela de traduções atuais (não tem paginação)")
    public ApiResponseDTO<TranslationTableDTO> getTranslationTable();

    @Operation(summary = "Salva uma alteração de uma tradução no sistema")
    public ApiResponseDTO<TranslationDetailsDTO> saveTranslation(@RequestBody @Valid TranslationUpdateDTO dto);

    @Operation(summary = "Cria um novo idioma no sistema")
    public ApiResponseDTO<Void> createNewTranslation(@PathVariable String lang);
}
