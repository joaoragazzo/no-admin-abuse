import type { ServerDTO } from "./ServerDTO";

export interface ServerGroupDTO {
    id: string,
    name: string,
    servers: ServerDTO[]
}