package com.noadminabuse.alpha.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.enums.Role;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.repository.UserRepository;
import com.noadminabuse.alpha.web.dto.auth.SuccessLoginDTO;
import com.noadminabuse.alpha.web.dto.user.UserAuthDataDTO;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Profile("dev")
@AllArgsConstructor
public class DebugService {
    private final UserService userService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public SuccessLoginDTO generateSteamLoginBySteamId(String steam64id) {
        User user = userService.getUserBySteamId(steam64id);
        String jwt = jwtService.generateToken(user.getId());

        return new SuccessLoginDTO(
            jwt,
            new UserAuthDataDTO(user.getId(), user.isAcceptedEula(), user.getSteamId(), "admin user", "https://avatars.steamstatic.com/bab2eaea37e9d6b718dd82f388ea9b9d84ad2b2f_full.jpg")
        );
    }

    @PostConstruct
    @Transactional
    private void createDefaultUser() {
        Optional<User> optionalUser = userRepository.findBySteamId("76561198118616961");

        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        } else {
            user = new User();
            user.setSteamId("76561198118616961");
        }

        user.setLastLoginAt(Instant.now());
        user.setUsername("admin user");
        user.setAvatarUrl("https://avatars.steamstatic.com/bab2eaea37e9d6b718dd82f388ea9b9d84ad2b2f_full.jpg");
        user.getRoles().add(Role.ROOT);
        userRepository.save(user);
    }
}
