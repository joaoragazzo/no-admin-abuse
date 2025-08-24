import type { ServerDTO } from "./ServerDTO";

export interface NetworkDetailsDTO {
    id: string,
    name: string,
    description: string,
    reviewsCount: number,
    reviewsAvg: number,
    positiveTags: string[],
    negativeTags: string[],
    servers: ServerDTO[],
    discord: string,
    instagram: string,
    youtube: string,
    website: string
}