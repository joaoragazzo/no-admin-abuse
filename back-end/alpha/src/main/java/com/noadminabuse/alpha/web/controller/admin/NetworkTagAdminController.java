package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.mapper.NetworkTagMapper;
import com.noadminabuse.alpha.messages.NetworkTagsMessage;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.web.dto.MessageDTO;
import com.noadminabuse.alpha.web.dto.networkTags.CreateNetworkTagDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@AllArgsConstructor
@RequestMapping("/admin/networktags")
public class NetworkTagAdminController {
    private final NetworkTagService networkTagService;
    private final NetworkTagMapper networkTagMapper;
    private final FeedbackMapper feedbackMapper;

    @PostMapping("/")
    public ResponseEntity<NetworkTagInfoDTO> createNewNetworkTag(@RequestBody  CreateNetworkTagDTO dto) {
        NetworkTag tag = networkTagService.createNewTag(dto.slug(), dto.isPositive(), dto.gameId());
        NetworkTagInfoDTO response = networkTagMapper.toNetworkTagInfoDTO(tag);
        
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/")
    public ResponseEntity<List<NetworkTagInfoDTO>> getAllTags() {
        List<NetworkTag> tags = networkTagService.getAllTags();
        return ResponseEntity.ok().body(networkTagMapper.toNetworkTagInfoDTO(tags));
    }

    @DeleteMapping("/{gameId}/{tagId}")
    public ResponseEntity<MessageDTO> deleteNetworkTag(@PathVariable UUID gameId, @PathVariable UUID tagId) {
        networkTagService.deleteTag(gameId, tagId);
        return ResponseEntity.ok().body(
            feedbackMapper.success(
                NetworkTagsMessage.SUCCESS_DELETED_NETWORK_TAG
                )
            ); 
    }
    
    

}
