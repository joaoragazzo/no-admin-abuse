package com.noadminabuse.alpha.web.dto;

import com.noadminabuse.alpha.enums.FeedbackType;

import io.swagger.v3.oas.annotations.media.Schema;

public record ApiResponseDTO<T>(
    
    @Schema(description = "Dados retornados pela operação (pode ser nulo em operações sem retorno)")
    T data,
    
    @Schema(description = "Mensagem codificada do feedback da operação")
    String message,

    @Schema(description = "Tipo da mensagem retornada")
    FeedbackType type
) {}
