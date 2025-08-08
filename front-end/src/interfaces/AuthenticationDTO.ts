import type { UserInfoDTO } from "./UserInfoDTO";

export interface AuthenticationDTO {
    jwt: string,
    user: UserInfoDTO
}