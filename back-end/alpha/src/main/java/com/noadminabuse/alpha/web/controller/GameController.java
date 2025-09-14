package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.GameService;
import com.noadminabuse.alpha.web.dto.game.GameBannerDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/games")
@AllArgsConstructor
public class GameController {
    
    private final GameService gameService;

    @GetMapping("/")
    public ResponseEntity<List<GameBannerDTO>> getAllGameBanners() {
        return ResponseEntity.ok().body(gameService.getAllGamesBanner());
    }
    
}
