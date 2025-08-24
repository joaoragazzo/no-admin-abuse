package com.noadminabuse.alpha.web.dto.network;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.web.dto.server.ServerDTO;

public record NetworkBannerDTO(
    UUID id,
    String name,
    String description,
    Long reviewsCount,
    Long reviewsAvg,
    List<ServerDTO> servers
) {}
