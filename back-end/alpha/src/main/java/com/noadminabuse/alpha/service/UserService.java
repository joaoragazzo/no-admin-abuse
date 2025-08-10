package com.noadminabuse.alpha.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
            return existingUser;
        }
        
        User newUser = new User(steamId, username, avatarUrl);
        userRepository.save(newUser);
        return newUser;
    }   
}
