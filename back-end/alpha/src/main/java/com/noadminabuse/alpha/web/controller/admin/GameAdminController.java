package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.GameService;
import com.noadminabuse.alpha.web.controller.BaseController;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.OptionDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/games")
public class GameAdminController extends BaseController {
    
    private final GameService gameService;

    @GetMapping("/options")
    public ApiResponseDTO<List<OptionDTO>> getGameOptions() {
        return ok(gameService.getAllGamesOptions());
    }
    
}
