import type { NetworkTagDTO } from "../networkTag/NetworkTag";
import type { UserBasicInfoDTO } from "../user/UserBasicInfoDTO";

export interface ReviewDisplayDTO {
    id: string,
    author: UserBasicInfoDTO | null,
    isAnonymous: boolean,
    text: string,
    rating: number,
    createdAt: number,
    liked: boolean,
    likesCount: number,
    tags: NetworkTagDTO[]
}