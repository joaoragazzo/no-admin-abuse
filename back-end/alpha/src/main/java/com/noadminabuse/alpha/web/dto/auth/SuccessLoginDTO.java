package com.noadminabuse.alpha.web.dto.auth;

import com.noadminabuse.alpha.web.dto.user.UserFullInfoDTO;

public record SuccessLoginDTO(
    String token,
    UserFullInfoDTO user
) {}
