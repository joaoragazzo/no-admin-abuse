package com.noadminabuse.alpha.web.dto.network;

import java.util.List;
import java.util.UUID;

import com.noadminabuse.alpha.web.dto.review.ReviewStatsDTO;
import com.noadminabuse.alpha.web.dto.server.ServerDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record NetworkDetailsDTO(
    UUID id,
    @NotBlank String name,
    @NotBlank String description,
    Long reviewsCount,
    Long reviewsAvg,
    List<ReviewStatsDTO> stats,
    List<String> positiveTags,
    List<String> negativeTags,
    @NotEmpty List<ServerDTO> servers,
    String discord,
    String instagram,
    String youtube,
    String website
) {}
