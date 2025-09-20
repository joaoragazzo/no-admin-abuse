package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.GameService;
import com.noadminabuse.alpha.web.dto.OptionDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/games")
public class GameAdminController {
    
    private final GameService gameService;

    @GetMapping("/options")
    public ResponseEntity<List<OptionDTO>> getGameOptions() {
        return ResponseEntity.ok().body(gameService.getAllGamesOptions());
    }
    
}
