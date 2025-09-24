package com.noadminabuse.alpha.mapper;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.user.UserBasicInfoDTO;
import com.noadminabuse.alpha.web.dto.user.UserFullInfoDTO;

@Component
public class UserMapper {
    
    public UserBasicInfoDTO toUserBasicInfoDTO(User user) {
        return new UserBasicInfoDTO(user.getId(), user.getUsername(), user.getAvatarUrl());
    }

    public UserFullInfoDTO toUserFullInfoDTO(User user) {
        return new UserFullInfoDTO(
            user.getId(), 
            user.getUsername(), 
            user.getAvatarUrl(), 
            user.getRoles(), 
            user.getLastLoginAt(), 
            user.getCreatedAt()
        );
    }

    public List<UserFullInfoDTO> toUserBasicInfoDTO(List<User> users) {
        List<UserFullInfoDTO> result = new ArrayList<>();

        for (User user : users) {
            result.add(toUserFullInfoDTO(user));
        }

        return result;
    }
}
