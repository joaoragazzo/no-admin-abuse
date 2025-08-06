package com.noadminabuse.alpha.web.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record NetworkDetailsDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank String description,
    List<String> positiveTags,
    List<String> negativeTags,
    @NotEmpty List<ServerDTO> servers,
    String discord,
    String instagram,
    String youtube,
    String website
) {}
