import type { GameInfoDTO } from "../game/GameInfoDTO"

export interface NetworkTagInfoDTO {
    id: string,
    tagSlug: string,
    isPositive: boolean,
    game: GameInfoDTO
}