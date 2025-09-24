package com.noadminabuse.alpha.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.noadminabuse.alpha.config.client.SteamApiClient;
import com.noadminabuse.alpha.errors.BadRequest;
import com.noadminabuse.alpha.errors.Unauthorized;
import com.noadminabuse.alpha.errors.UnprocessableEntity;
import com.noadminabuse.alpha.errors.enums.AuthErrorMessage;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.auth.SteamQueryDTO;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.web.dto.user.UserAuthDataDTO;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    @Value("${steam.openid.realm}")
    private String realm;

    @Value("${steam.openid.return-to}")
    private String returnTo;

    private final SteamApiClient steamApiClient;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthService(SteamApiClient steamApiClient, JwtService jwtService, UserService userService) {
        this.steamApiClient = steamApiClient;
        this.jwtService = jwtService;
        this.userService = userService;
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
        SteamQueryDTO steamQueryDTO = steamApiClient.getBasicInfo(steamId).block();
        User user = userService.createOrUpdate(steamId, steamQueryDTO.name(), steamQueryDTO.avatarfull());
        String jwt = jwtService.generateToken(user.getId());
        return new SuccessLoginDTO(
            jwt,
            new UserAuthDataDTO(user.getId(), user.isAcceptedEula(), steamId, steamQueryDTO.name(), steamQueryDTO.avatarfull())
        );
    }

    public SuccessLoginDTO refreshSteamLogin(UUID uuid) {
        String jwt = jwtService.generateToken(uuid);
        User user = userService.getUser(uuid);
        SteamQueryDTO steamQueryDTO = steamApiClient.getBasicInfo(user.getSteamId()).block();

        return new SuccessLoginDTO(
            jwt,
            new UserAuthDataDTO(
                user.getId(), 
                user.isAcceptedEula(), 
                user.getSteamId(), 
                steamQueryDTO.name(), 
                steamQueryDTO.avatarfull()
            )
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
