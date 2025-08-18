package com.noadminabuse.alpha.web.dto.network;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.web.dto.server.ServerDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record NetworkDTO(
    UUID id,
    @NotBlank String name,
    @NotEmpty List<ServerDTO> servers
) {}
