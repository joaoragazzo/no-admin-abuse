package com.noadminabuse.alpha.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.noadminabuse.alpha.components.SteamApiClient;
import com.noadminabuse.alpha.errors.BadRequest;
import com.noadminabuse.alpha.errors.Unauthorized;
import com.noadminabuse.alpha.errors.UnprocessableEntity;
import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;
import com.noadminabuse.alpha.web.dto.auth.SteamQueryDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.web.dto.auth.UserInfoDTO;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    @Value("${steam.openid.realm}")
    private String realm;

    @Value("${steam.openid.return-to}")
    private String returnTo;

    private final SteamApiClient steamApiClient;
    private final JwtService jwtService;

    public AuthService(SteamApiClient steamApiClient, JwtService jwtService) {
        this.steamApiClient = steamApiClient;
        this.jwtService = jwtService;
    }

    private static final String STEAM_OPENID = "https://steamcommunity.com/openid/login";

    public String buildSteamOpenIdUrl() {
        return UriComponentsBuilder
            .fromUriString(STEAM_OPENID)
            .queryParam("openid.ns", "http://specs.openid.net/auth/2.0")
            .queryParam("openid.mode", "checkid_setup")
            .queryParam("openid.return_to", returnTo)
            .queryParam("openid.realm", realm)
            .queryParam("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select")
            .queryParam("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select")
            .build()
            .toUriString();
    }

    public SuccessLoginDTO confirmSteamLogin(HttpServletRequest request) {
        confirmOpenIdMode(request);
        confirmOpenIdSignature(request);
        String steamId = confirmClaimedSteamId(request);
        String jwt = jwtService.generateToken(steamId);
        SteamQueryDTO steamQueryDTO = steamApiClient.getBasicInfo(steamId).block();

        return new SuccessLoginDTO(
            jwt,
            new UserInfoDTO(null, steamId, steamQueryDTO.name(), steamQueryDTO.avatarfull())
        );
    }

    private void confirmOpenIdSignature(HttpServletRequest request) {
        Map<String, String> params = new HashMap<>();
        request.getParameterMap().forEach((key, values) -> {
            if (values.length > 0) {
                params.put(key, values[0]);
            }
        });

        if(!steamApiClient.isLegitOpenIdResponse(params))
            throw new Unauthorized(AuthErrorMessage.COULD_NOT_CONFIRM_OPENID_SIGNATURE);
    }

    private String confirmClaimedSteamId(HttpServletRequest request) {
        String claimedId = request.getParameter("openid.claimed_id");
        
        if (Objects.isNull(claimedId) || !claimedId.startsWith("https://steamcommunity.com/openid/id/"))
            throw new UnprocessableEntity(AuthErrorMessage.INVALID_STEAM_ID);
    
        String steamId = claimedId.replace("https://steamcommunity.com/openid/id/", "");

        if (Objects.isNull(steamId) || steamId.isEmpty())
            throw new BadRequest(AuthErrorMessage.INVALID_STEAM_RESPONSE);

        return steamId;    
    }

    private void confirmOpenIdMode(HttpServletRequest request) {
        String openIdMode = request.getParameter("openid.mode");
        
        if(!"id_res".equals(openIdMode))
            throw new BadRequest(AuthErrorMessage.INVALID_STEAM_RESPONSE);
    }
}
