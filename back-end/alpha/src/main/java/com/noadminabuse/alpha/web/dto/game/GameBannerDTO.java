package com.noadminabuse.alpha.web.dto.game;

public record GameBannerDTO(
    String name,
    String slug,
    Long networksCount,
    Long serverCount,
    Long reviewsCount
) {}
