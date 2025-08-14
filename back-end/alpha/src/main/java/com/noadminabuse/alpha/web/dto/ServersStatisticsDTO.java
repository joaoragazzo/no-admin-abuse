package com.noadminabuse.alpha.web.dto;

public record ServersStatisticsDTO(
    Integer servers,
    Integer onlinePlayers,
    Integer reviews,
    Integer regions
) {}
