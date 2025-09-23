package com.noadminabuse.alpha.config.client.dto.battlemetrics;

import java.time.Instant;
import java.util.List;

import com.noadminabuse.alpha.enums.CountryCode;

public record ServerAttributes(
    String id, 
    String name,
    String address,
    String ip,
    int port,
    int players,
    int maxPlayers,
    int rank,
    List<Double> location,
    String status,
    ServerDetails details,
    boolean privateServer,
    Instant createdAt,
    Instant updatedAt,
    int portQuery,
    CountryCode country,
    String queryStatus 
) {}
