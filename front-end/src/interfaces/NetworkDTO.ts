import type { ServerDTO } from "./ServerDTO";

export interface NetworkDTO {
    id: string,
    name: string,
    description: string,
    servers: ServerDTO[],
}