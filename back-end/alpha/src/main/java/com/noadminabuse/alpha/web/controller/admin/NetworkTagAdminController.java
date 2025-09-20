package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.web.dto.networkTags.CreateNetworkTagDTO;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/networktags")
public class NetworkTagAdminController {
    private final NetworkTagService networkTagService;

    @PostMapping("/")
    public ResponseEntity<NetworkTag> createNewNetworkTag(@RequestBody  CreateNetworkTagDTO dto) {
        NetworkTag tag = networkTagService.createNewTag(dto.tagSlug(), dto.isPositive(), dto.gameId());
        return ResponseEntity.ok().body(tag);
    }
    

}
