import api from "@/config/axiosClient";
import type { NetworkDetailsDTO } from "@/types/network/NetworkDetailsDTO";
import type { NetworkDTO } from "@/types/network/NetworkDTO";
import type { Pageable } from "@/types/Pageable";
import type { ReviewDisplayResponseDTO } from "@/types/reviews/ReviewResponseDTO";

const fetchAllNetworks = async (
    { 
        page, 
        tags, 
        search, 
        region,
        gameSlug
    } : { 
        page: number, 
        tags: string[], 
        search: string, 
        region: string|null,
        gameSlug: string
    }): Promise<Pageable<NetworkDTO>> => {
    const response =  await api.post<Pageable<NetworkDTO>>(`/networks/`, {
        page: page, 
        tags: tags, 
        search: search, 
        region: region,
        gameSlug: gameSlug
    });
    return response.data;
}

const fetchNetworkDetails = async (
    { id } : {id: string}
): Promise<NetworkDetailsDTO> => {
    const response = await api.get<NetworkDetailsDTO>(`/networks/${id}`);
    return response.data;
}

const fetchReviews = async (
    {networkId} : 
    {
        networkId: string
    }
): Promise<ReviewDisplayResponseDTO> => {
    const response = await api.get<ReviewDisplayResponseDTO>(`/networks/${networkId}/reviews`);
    return response.data;
}


export default { fetchNetworkDetails, fetchAllNetworks, fetchReviews }