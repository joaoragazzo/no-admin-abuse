package com.noadminabuse.alpha.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.web.dto.user.UserFullInfoDTO;

import lombok.AllArgsConstructor;

@Service
@Profile("dev")
@AllArgsConstructor
public class DebugService {
    private final UserService userService;
    private final JwtService jwtService;

    public SuccessLoginDTO generateSteamLoginBySteamId(String steam64id) {
        User user = userService.getUserBySteamId(steam64id);
        String jwt = jwtService.generateToken(user.getId());

        return new SuccessLoginDTO(
            jwt,
            new UserFullInfoDTO(user.getId(), user.isAcceptedEula(), user.getSteamId(), "admin user", "https://avatars.steamstatic.com/bab2eaea37e9d6b718dd82f388ea9b9d84ad2b2f_full.jpg")
        );
    }
}
