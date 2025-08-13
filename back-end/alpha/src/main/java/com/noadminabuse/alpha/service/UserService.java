package com.noadminabuse.alpha.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.noadminabuse.alpha.errors.NotFound;
import com.noadminabuse.alpha.errors.enums.UserErrorMessage;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

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

    public void userConsentEula(UUID uuid) {
        User user = getUser(uuid);
        user.setAcceptedEula(true);
        user.setAcceptedEulaAt(Instant.now());
        userRepository.save(user);
    }

    
}
