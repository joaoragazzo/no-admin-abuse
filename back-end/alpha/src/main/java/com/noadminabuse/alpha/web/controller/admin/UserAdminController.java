package com.noadminabuse.alpha.web.controller.admin;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noadminabuse.alpha.mapper.UserMapper;
import com.noadminabuse.alpha.model.User;
import com.noadminabuse.alpha.service.UserService;
import com.noadminabuse.alpha.web.controller.BaseController;
import com.noadminabuse.alpha.web.dto.ApiResponseDTO;
import com.noadminabuse.alpha.web.dto.user.UserFullInfoDTO;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@AllArgsConstructor
@RequestMapping("/admin/users")
public class UserAdminController extends BaseController {
    
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/")
    public ApiResponseDTO<List<UserFullInfoDTO>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserFullInfoDTO> response = userMapper.toUserBasicInfoDTO(users);
        return ok(response);
    }
        
}
