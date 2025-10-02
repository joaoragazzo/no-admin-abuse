package com.noadminabuse.alpha.web.controller.docs;

import java.util.UUID;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.review.ReviewCreationDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Reviews", description = "Operações de gestão de avaliações a redes de servidores")
public interface ReviewApi {
    
    @Operation(summary = "Cria uma nova review", description = "Cria uma review associada a uma rede e retorna uma mensagem de sucesso.")
    @ApiResponses({
        @ApiResponse(
            responseCode = "200",
            description = "Review criada com sucesso",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
            description = "Erro de validação dos dados da review",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponseDTO.class)
            )
        )
    })
    @Parameter(name="networkId", description = "ID único da rede de servidores a receber a avaliação")
    public ApiResponseDTO<Void> createReview(
        @PathVariable UUID networkId,
        @RequestBody @Valid ReviewCreationDTO dto
    );

    @Operation(summary = "Deleta a avaliação recebida como parâmetro")
    @Parameter(name = "reviewId", description = "ID único da avaliação a ser deletada")
    public ApiResponseDTO<Void> deleteReview(@PathVariable UUID reviewId);

    @Operation(summary = "Deleta a avaliação recebida como parâmetro")
    @Parameter(name = "reviewId", description = "ID único da avaliação a ser deletada")
    public ApiResponseDTO<Void> unlikeReview(@PathVariable UUID reviewId);
    
    @Operation(summary = "Adiciona um like a avaliação recebida como parâmetro")
    @Parameter(name = "reviewId", description = "ID único da avaliação a ser deletada")
    public ApiResponseDTO<Void> likeReview(@PathVariable UUID reviewId);
}
