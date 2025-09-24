package com.noadminabuse.alpha.web.controller.docs;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Tags de redes", description = "Consultas de tags de servidores disponíveis")
public interface NetworkTagApi {
    
    @Operation(summary = "Verifica as tags disponíveis para avaliações", description = "Consulta todas as tags disponíveis para a avaliação de uma rede de um jogo")
    @Parameter(name = "game", description = "O slug do jogo da rede")
    public ApiResponseDTO<List<NetworkTagDTO>> getNetworkTagDTOByGame(@PathVariable String game);
}
