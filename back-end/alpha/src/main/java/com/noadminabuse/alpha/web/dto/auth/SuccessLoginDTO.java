package com.noadminabuse.alpha.web.dto.auth;

import com.noadminabuse.alpha.web.dto.user.UserAuthDataDTO;

public record SuccessLoginDTO(
    String token,
    UserAuthDataDTO user
) {}
