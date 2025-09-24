package com.noadminabuse.alpha.web.controller.docs;

import java.util.List;

import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Informações gerais de jogos")
public interface GameApi {
    
    @Operation(summary = "Retorna o banner de todos os jogos")
    public ApiResponseDTO<List<GameBannerDTO>> getAllGameBanners();
}
