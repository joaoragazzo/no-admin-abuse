import type { GameInfoDTO } from "../game/GameInfoDTO"

export interface NetworkTagInfoDTO {
    id: string,
    slug: string,
    isPositive: boolean,
    game: GameInfoDTO
}