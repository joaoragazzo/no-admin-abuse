package com.noadminabuse.alpha.web.controller.docs;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.dayz.SearchFilterDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkBannerDTO;
import com.noadminabuse.alpha.web.dto.network.NetworkDetailsDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewDisplayResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Redes de servidores", description = "Operações públicas de gestão de redes de servidores")
public interface NetworkApi {
    @Operation(summary = "Retorna todos os detalhes da rede passada como parâmetro")
    @Parameter(name = "networkId", description = "ID único da rede a ser retornada")
    public ApiResponseDTO<NetworkDetailsDTO> fetchNetworkDetails(@PathVariable("networkId") UUID id);

    @Operation(summary = "Realiza uma busca paginada das redes de servidores")
    public ApiResponseDTO<Page<NetworkBannerDTO>> fetchAllServers(@RequestBody @Valid SearchFilterDTO filter);

    @Operation(summary = "Retorna todas as avaliações da rede")
    @Parameter(name = "networkId", description = "ID único da rede de servidores para pegar as avaliações")
    public ApiResponseDTO<ReviewDisplayResponseDTO> getReview(@PathVariable UUID networkId);
}
