package com.noadminabuse.alpha.web.controller.docs;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Usuários", description = "Operações públicas de gestão de usuários")
public interface UserApi {
    
    @Operation(summary = "Aceita os termos de e condições de uso e política de privacidade do usuário logado")
    public ApiResponseDTO<Void> consentEula();
}
