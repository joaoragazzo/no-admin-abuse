import type { ServerDTO } from "./ServerDTO";

export interface NetworkDTO {
    id: string,
    name: string,
    description: string,
    reviewsCount: number,
    reviewsAvg: number,
    servers: ServerDTO[],
}