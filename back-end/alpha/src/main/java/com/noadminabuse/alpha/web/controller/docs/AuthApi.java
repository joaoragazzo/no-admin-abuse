package com.noadminabuse.alpha.web.controller.docs;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;

@Tag(name = "Autenticação")
public interface AuthApi {
    
    @Operation(summary = "Endpoint responsavel para o callback do OpenID da Steam")
    public ApiResponseDTO<SuccessLoginDTO> steamCallback(HttpServletRequest request);

    @Operation(summary = "Executa um refresh na sessão do usuário. Retorna todas as informações atuais da Steam")
    public ApiResponseDTO<SuccessLoginDTO> fetchUserInfo();
}
