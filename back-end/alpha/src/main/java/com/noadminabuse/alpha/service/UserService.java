package com.noadminabuse.alpha.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.UserErrorMessage;
import com.noadminabuse.alpha.mapper.FeedbackMapper;
import com.noadminabuse.alpha.messages.UserMessage;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.repository.UserRepository;
import com.noadminabuse.alpha.web.dto.MessageDTO;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final FeedbackMapper feedbackMapper;

    public User createOrUpdate(String steamId, String username, String avatarUrl) {
        Optional<User> user = userRepository.findBySteamId(steamId);

        if (user.isPresent()) {
            User existingUser = user.get();
            existingUser.setLastLoginAt(Instant.now());
            existingUser.setUsername(username);
            existingUser.setAvatarUrl(avatarUrl);
            return userRepository.save(existingUser);
        }
        
        User newUser = new User(steamId, username, avatarUrl);
        return userRepository.save(newUser);
    }

    public User getUser(UUID uuid) {
        return userRepository.findById(uuid).orElseThrow(
            () -> new NotFound(UserErrorMessage.USER_NOT_FOUND)
        );
    }

    public User getUserBySteamId(String steam64id) {
        return userRepository.findBySteamId(steam64id).orElseThrow(
            () -> new NotFound(UserErrorMessage.USER_NOT_FOUND)
        );
    }

    public MessageDTO userConsentEula(UUID uuid) {
        User user = getUser(uuid);
        user.setAcceptedEula(true);
        user.setAcceptedEulaAt(Instant.now());
        userRepository.save(user);

        return feedbackMapper.success(UserMessage.SUCCESS_ACCEPTED_EULA);
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
        userRepository.save(user);
    }
}
