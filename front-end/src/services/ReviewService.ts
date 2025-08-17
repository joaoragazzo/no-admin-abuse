import api from "@/config/axiosClient";
import type { MessageDTO } from "@/interfaces/MessageDTO";
import type { ReviewDisplayDTO } from "@/interfaces/ReviewDisplayDTO";

const makeReview = async (
    {networkId, rating, text, anonymous} : 
    {
        networkId: string,
        rating: number,
        text: string,
        anonymous: boolean
    }
): Promise<MessageDTO> => {
    const response = await api.post<MessageDTO>(`/review/${networkId}`, {
        rating: rating,
        text: text,
        anonymous: anonymous
    })
    return response.data;
}

const fetchReview = async (
    {networkId} : 
    {
        networkId: string
    }
): Promise<ReviewDisplayDTO[]> => {
    const response = await api.get<ReviewDisplayDTO[]>(`/review/${networkId}`);
    return response.data;
}

export default { makeReview, fetchReview };