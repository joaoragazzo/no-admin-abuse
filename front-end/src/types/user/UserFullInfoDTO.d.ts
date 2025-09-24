export interface UserFullInfoDTO {
    id: string,
    username: string,
    avatarUrl: string,
    roles: "ROOT" | "ADMIN" | "USER",
    lastSeenAt: number,
    createdAt: number
}