import type { UserInfoDTO } from "./UserInfoDTO";

export interface AuthenticationDTO {
    token: string,
    user: UserInfoDTO
}