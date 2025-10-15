package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.ScrappingService;
import com.noadminabuse.alpha.web.controller.BaseController;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.gameplay.GameplayTagDTO;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/scrapping")
public class ScrappingAdminController extends BaseController {
    
    private final ScrappingService scrappingService;

    @GetMapping("/{gameId}")
    public ApiResponseDTO<List<GameplayTagDTO>> getAllGameplayTags(@PathVariable UUID gameId) {
        return ok(scrappingService.getAllGameplayTags(gameId));
    }
    
}
