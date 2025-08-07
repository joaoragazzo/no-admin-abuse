package com.noadminabuse.alpha.web.dto.auth;

public record SuccessLoginDTO(
    String token,
    UserInfoDTO user
) {}
