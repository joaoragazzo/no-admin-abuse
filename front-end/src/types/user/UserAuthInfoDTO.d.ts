export interface UserAuthInfoDTO {
    id: string,
    eula: boolean,
    steam64id: string,
    username: string,
    avatarUrl: string,
    roles: ("ROOT" | "ADMIN" | "MEMBER")[]
}