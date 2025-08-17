import api from "@/config/axiosClient";
import type { NetworkDetailsDTO } from "@/interfaces/NetworkDetailsDTO";


const fetchNetworkDetails = async (
    { id } : {id: string}
): Promise<NetworkDetailsDTO> => {
    const response = await api.get<NetworkDetailsDTO>(`/network/${id}`);
    return response.data;
}

export default { fetchNetworkDetails }