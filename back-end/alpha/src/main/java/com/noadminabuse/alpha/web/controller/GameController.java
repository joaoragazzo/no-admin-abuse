package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.GameService;
import com.noadminabuse.alpha.web.controller.docs.GameApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/games")
@AllArgsConstructor
public class GameController extends BaseController implements GameApi {
    
    private final GameService gameService;

    @GetMapping("/")
    public ApiResponseDTO<List<GameBannerDTO>> getAllGameBanners() {
        return ok(gameService.getAllGamesBanner());
    }
    
}
