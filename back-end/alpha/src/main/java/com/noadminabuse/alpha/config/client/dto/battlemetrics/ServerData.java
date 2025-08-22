package com.noadminabuse.alpha.config.client.dto.battlemetrics;


public record ServerData(
    String type,
    String id,
    ServerAttributes attributes,
    ServerRelationships relationships
) {}
