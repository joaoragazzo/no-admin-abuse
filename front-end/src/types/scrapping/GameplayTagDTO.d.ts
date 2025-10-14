import type { GameplayTagAliasDTO } from "./GameplayTagAliasDTO";

export interface GameplayTagDTO {
    id: string,
    slug: string,
    aliases: GameplayTagAliasDTO[]
}