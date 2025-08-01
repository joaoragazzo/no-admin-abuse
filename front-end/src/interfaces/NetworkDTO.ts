import type { ServerDTO } from "./ServerDTO";

export interface NetworkDTO {
    id: string,
    name: string,
    servers: ServerDTO[]
}