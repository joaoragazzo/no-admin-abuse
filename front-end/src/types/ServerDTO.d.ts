export interface ServerDTO {
    id?: string,
    name: string,
    ip: string,
    port: string,
    tags: string[],
    country: string,
    maxPlayers: number,
    onlinePlayers: number
}