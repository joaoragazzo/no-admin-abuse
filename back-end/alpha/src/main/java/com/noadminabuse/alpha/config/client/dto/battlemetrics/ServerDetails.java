package com.noadminabuse.alpha.config.client.dto.battlemetrics;

import java.util.List;

public record ServerDetails(
    String version,
    boolean password,
    boolean official,
    String time,
    boolean thirdPerson,
    boolean modded,
    List<Long> modIds,
    List<String> modNames,
    String serverSteamId
) {}
