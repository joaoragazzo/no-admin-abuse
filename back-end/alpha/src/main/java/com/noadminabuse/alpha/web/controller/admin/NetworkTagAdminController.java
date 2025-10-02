package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.NetworkTagMapper;
import com.noadminabuse.alpha.messages.NetworkTagMessage;
import com.noadminabuse.alpha.model.NetworkTag;
import com.noadminabuse.alpha.service.NetworkTagService;
import com.noadminabuse.alpha.web.controller.BaseController;
import com.noadminabuse.alpha.web.controller.admin.docs.NetworkTagAdminApi;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.networkTags.CreateNetworkTagDTO;
import com.noadminabuse.alpha.web.dto.networkTags.NetworkTagInfoDTO;

import lombok.AllArgsConstructor;

import java.util.Set;
import java.util.UUID;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@AllArgsConstructor
@RequestMapping("/admin/networktags")
public class NetworkTagAdminController extends BaseController implements NetworkTagAdminApi {
    private final NetworkTagService networkTagService;
    private final NetworkTagMapper networkTagMapper;

    @PostMapping("/")
    public ApiResponseDTO<NetworkTagInfoDTO> createNewNetworkTag(@RequestBody  CreateNetworkTagDTO dto) {
        NetworkTag tag = networkTagService.createTag(dto.slug(), dto.isPositive(), dto.gameId());
        NetworkTagInfoDTO response = networkTagMapper.toNetworkTagInfoDTO(tag);
        
        return success(response, NetworkTagMessage.SUCCESS_CREATED_NETWORK_TAG);
    }

    @GetMapping("/")
    public ApiResponseDTO<Set<NetworkTagInfoDTO>> getAllTags() {
        Set<NetworkTag> tags = networkTagService.getAllTags();
        return ok(networkTagMapper.toNetworkTagInfoDTO(tags));
    }

    @DeleteMapping("/{gameId}/{tagId}")
    public ApiResponseDTO<Void> deleteNetworkTag(@PathVariable UUID gameId, @PathVariable UUID tagId) {
        networkTagService.deleteTag(gameId, tagId);
        return success(
            NetworkTagMessage.SUCCESS_DELETED_NETWORK_TAG
        ); 
    }
    
    

}
