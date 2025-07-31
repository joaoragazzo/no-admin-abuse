package com.noadminabuse.alpha.web.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record ServerGroupDTO(
    UUID id,
    @NotBlank String name,
    @NotEmpty List<ServerDTO> servers
) {}
