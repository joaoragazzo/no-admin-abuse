package com.noadminabuse.alpha.config.client.dto.battlemetrics;

import java.util.List;

public record BattleMetricsResponse(
    List<ServerData> data,
    Links links
) {}
