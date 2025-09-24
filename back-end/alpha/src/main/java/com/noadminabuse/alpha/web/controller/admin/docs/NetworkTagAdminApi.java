package com.noadminabuse.alpha.web.controller.admin.docs;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.networkTags.CreateNetworkTagDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
    name = "Gestão de tags de redes",
    description = "As tags de rede são tags utilizadas e atreladas a redes durante uma avaliação"
)
public interface NetworkTagAdminApi {
    
    @Operation(summary = "Cria uma nova tag de rede")
    public ApiResponseDTO<NetworkTagInfoDTO> createNewNetworkTag(@RequestBody  CreateNetworkTagDTO dto);
    
    @Operation(summary = "Retorna todas as tags de rede existentes")
    public ApiResponseDTO<List<NetworkTagInfoDTO>> getAllTags();
    
    @Operation(summary = "Remove uma tag de rede")
    @Parameters({
        @Parameter(name = "gameId", description = "ID único referente ao jogo da tag"),
        @Parameter(name = "tagId", description = "ID único referente a tag a ser excluída")
    })
    public ApiResponseDTO<Void> deleteNetworkTag(@PathVariable UUID gameId, @PathVariable UUID tagId);
}
