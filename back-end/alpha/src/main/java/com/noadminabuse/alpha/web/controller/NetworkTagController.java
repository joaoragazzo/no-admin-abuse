package com.noadminabuse.alpha.web.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/networktags")
@AllArgsConstructor
public class NetworkTagController extends BaseController {
    
    private final NetworkTagService networkTagService;

    @GetMapping("/{game}")
    public ApiResponseDTO<List<NetworkTagDTO>> getNetworkTagDTOByGame(@PathVariable String game) {
        List<NetworkTagDTO> response = networkTagService.getAllTagsByGame(game);
        return ok(response);
    }
    
}
