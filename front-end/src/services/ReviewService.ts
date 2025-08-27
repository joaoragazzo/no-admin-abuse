import api from "@/config/axiosClient";
import type { MessageDTO } from "@/interfaces/MessageDTO";
import type { ReviewCreationDTO } from "@/interfaces/ReviewCreationDTO";
import type { ReviewDisplayResponseDTO } from "@/interfaces/ReviewResponseDTO";
import type { ReviewStatsDTO } from "@/interfaces/ReviewStatsDTO";

const postReview = async (
    {networkId, data}: {networkId: string, data: ReviewCreationDTO }
): Promise<MessageDTO> => {
    const response = await api.post<MessageDTO>(`/review/${networkId}`, data)
    return response.data;
}

const fetchReview = async (
    {networkId} : 
    {
        networkId: string
    }
): Promise<ReviewDisplayResponseDTO> => {
    const response = await api.get<ReviewDisplayResponseDTO>(`/review/${networkId}`);
    return response.data;
}

const deleteReview = async (
    {reviewId} :
    {
        reviewId: string
    }
): Promise<MessageDTO> => {
    const response = await api.delete<MessageDTO>(`/review/${reviewId}`);
    return response.data;
}

const getReviewsStats = async ({networkId}:{networkId: string}): Promise<ReviewStatsDTO[]> => {
    const response = await api.get<ReviewStatsDTO[]>(`/review/${networkId}/stats`);
    return response.data;
}

export default { postReview, fetchReview, deleteReview, getReviewsStats };