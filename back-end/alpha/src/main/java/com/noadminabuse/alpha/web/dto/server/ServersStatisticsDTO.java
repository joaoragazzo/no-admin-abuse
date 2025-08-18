package com.noadminabuse.alpha.web.dto.server;

public record ServersStatisticsDTO(
    Integer servers,
    Integer onlinePlayers,
    Integer reviews,
    Integer regions
) {}
