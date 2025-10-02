import api from "@/config/axiosClient";
import type { MessageDTO } from "@/types/MessageDTO";
import type { ReviewCreationDTO } from "@/types/reviews/ReviewCreationDTO";
import type { ReviewStatsDTO } from "@/types/reviews/ReviewStatsDTO";

const postReview = async (
    {networkId, data}: {networkId: string, data: ReviewCreationDTO }
): Promise<MessageDTO> => {
    const response = await api.post<MessageDTO>(`/reviews/${networkId}`, data)
    return response.data;
}

const deleteReview = async (
    {reviewId} :
    {
        reviewId: string
    }
): Promise<MessageDTO> => {
    const response = await api.delete<MessageDTO>(`/reviews/${reviewId}`);
    return response.data;
}

const getReviewsStats = async ({networkId}:{networkId: string}): Promise<ReviewStatsDTO[]> => {
    const response = await api.get<ReviewStatsDTO[]>(`/reviews/${networkId}/stats`);
    return response.data;
}

const likeReview = async ({reviewId}:{reviewId: string}): Promise<void> => {
    const response = await api.post<void>(`/reviews/${reviewId}/like`);
    return response.data;
}

const unlikeReview = async ({reviewId}:{reviewId: string}): Promise<void> => {
    const response = await api.delete<void>(`/reviews/${reviewId}/like`);
    return response.data;
}

export default { likeReview, unlikeReview, postReview, deleteReview, getReviewsStats };