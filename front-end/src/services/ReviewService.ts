import api from "@/config/axiosClient";
import type { MessageDTO } from "@/interfaces/MessageDTO";
import type { ReviewCreationDTO } from "@/interfaces/ReviewCreationDTO";
import type { ReviewDisplayResponseDTO } from "@/interfaces/ReviewResponseDTO";

const makeReview = async (
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

export default { makeReview, fetchReview, deleteReview };