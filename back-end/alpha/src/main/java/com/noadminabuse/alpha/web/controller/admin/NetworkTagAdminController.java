package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.NetworkTagMapper;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.web.dto.networkTags.CreateNetworkTagDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@AllArgsConstructor
@RequestMapping("/admin/networktags")
public class NetworkTagAdminController {
    private final NetworkTagService networkTagService;
    private final NetworkTagMapper networkTagMapper;

    @PostMapping("/")
    public ResponseEntity<NetworkTagInfoDTO> createNewNetworkTag(@RequestBody  CreateNetworkTagDTO dto) {
        NetworkTag tag = networkTagService.createNewTag(dto.tagSlug(), dto.isPositive(), dto.gameId());
        NetworkTagInfoDTO response = networkTagMapper.toNetworkTagInfoDTO(tag);
        
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/")
    public ResponseEntity<List<NetworkTagInfoDTO>> getAllTags() {
        List<NetworkTag> tags = networkTagService.getAllTags();
        return ResponseEntity.ok().body(networkTagMapper.toNetworkTagInfoDTO(tags));
    }
    
    

}
