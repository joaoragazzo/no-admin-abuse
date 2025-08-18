import type { Pageable } from "./Pageable";
import type { ReviewDisplayDTO } from "./ReviewDisplayDTO";

export interface ReviewDisplayResponseDTO { 
    ownReview: ReviewDisplayDTO | null
    reviews: Pageable<ReviewDisplayDTO>
}