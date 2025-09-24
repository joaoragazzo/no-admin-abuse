import type { Role } from "../auth/Role";

export interface UserFullInfoDTO {
    id: string,
    username: string,
    avatarUrl: string,
    roles: Role[],
    lastSeenAt: number,
    createdAt: number
}