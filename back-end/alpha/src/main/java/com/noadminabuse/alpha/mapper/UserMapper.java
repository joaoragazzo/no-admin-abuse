package com.noadminabuse.alpha.mapper;

import org.springframework.stereotype.Component;

import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.web.dto.user.UserBasicInfoDTO;

@Component
public class UserMapper {
    
    public UserBasicInfoDTO toUserBasicInfoDTO(User user) {
        return new UserBasicInfoDTO(user.getId(), user.getUsername(), user.getAvatarUrl());
    }
}
