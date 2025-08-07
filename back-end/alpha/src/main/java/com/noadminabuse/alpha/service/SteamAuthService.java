package com.noadminabuse.alpha.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class SteamAuthService {
    @Value("${steam.openid.realm}")
    private String realm;

    @Value("${steam.openid.return-to}")
    private String returnTo;

    private static final String STEAM_OPENID_URL = "https://steamcommunity.com/openid/login";

    public String buildSteamOpenIdUrl() {
        return UriComponentsBuilder
            .fromUriString(STEAM_OPENID_URL)
            .queryParam("openid.ns", "http://specs.openid.net/auth/2.0")
            .queryParam("openid.mode", "checkid_setup")
            .queryParam("openid.return_to", returnTo)
            .queryParam("openid.realm", realm)
            .queryParam("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select")
            .queryParam("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select")
            .build()
            .toUriString();
    }

    public String verifySteamResponse(HttpServletRequest request) {
        String openIdMode = request.getParameter("openid.mode");
        if(!"id_res".equals(openIdMode)) {
            throw new RuntimeException("Invalid Steam response");
        }

        String claimedId = request.getParameter("openid.claimed_id");
        if (Objects.isNull(claimedId) || !claimedId.startsWith("https://steamcommunity.com/openid/id/")) {
            throw new RuntimeException("Invalid Steam Id");    
        }

        String steamId = claimedId.replace("https://steamcommunity.com/openid/id/", "");

        return steamId;
    }
}
