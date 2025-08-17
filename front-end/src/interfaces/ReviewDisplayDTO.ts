import type { UserBasicInfoDTO } from "./UserBasicInfoDTO";

export interface ReviewDisplayDTO {
    id: string,
    author: UserBasicInfoDTO,
    isAnonymous: boolean,
    text: string,
    rating: number,
    createdAt: number
}