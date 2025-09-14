import api from "@/config/axiosClient";
import type { NetworkDetailsDTO } from "@/interfaces/NetworkDetailsDTO";
import type { NetworkDTO } from "@/interfaces/NetworkDTO";
import type { Pageable } from "@/interfaces/Pageable";

const fetchAllNetworks = async (
    { 
        page, 
        tags, 
        search, 
        region,
        game
    } : { 
        page: number, 
        tags: string[], 
        search: string, 
        region: string|null,
        game: string
    }): Promise<Pageable<NetworkDTO>> => {
    const response =  await api.post<Pageable<NetworkDTO>>(`/network/`, {
        page: page, 
        tags: tags, 
        search: search, 
        region: region,
        game: game
    });
    return response.data;
}

const fetchNetworkDetails = async (
    { id } : {id: string}
): Promise<NetworkDetailsDTO> => {
    const response = await api.get<NetworkDetailsDTO>(`/network/${id}`);
    return response.data;
}

export default { fetchNetworkDetails, fetchAllNetworks }