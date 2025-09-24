import type { Role } from "../auth/Role";

export interface UserAuthInfoDTO {
    id: string,
    eula: boolean,
    steam64id: string,
    username: string,
    avatarUrl: string,
    roles: Role[]
}