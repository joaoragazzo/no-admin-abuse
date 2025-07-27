package com.noadminabuse.alpha.web.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public record ServerGroupDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank List<ServerDTO> servers
) {}
