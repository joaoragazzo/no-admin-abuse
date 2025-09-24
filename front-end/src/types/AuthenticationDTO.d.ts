import type { UserInfoDTO } from "./user/UserAuthInfoDTO";

export interface AuthenticationDTO {
    token: string,
    user: UserInfoDTO
}