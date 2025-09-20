import api from "@/config/axiosClient"
import type { CreateNewNetworkTag } from "@/interfaces/networkTag/CreateNetworkTagDTO"
import type { NetworkTagInfoDTO } from "@/interfaces/networkTag/NetworkTagInfoDTO";

const createNewNetworkTag = async (dto: CreateNewNetworkTag): Promise<NetworkTagInfoDTO> => {
    const response = await api.post<NetworkTagInfoDTO>("/admin/networktags/", dto)
    return response.data;
}

const getAllNetworkTags = async (): Promise<NetworkTagInfoDTO[]> => {
    const response = await api.get<NetworkTagInfoDTO[]>("/admin/networktags/");
    return response.data;
}

export default { createNewNetworkTag, getAllNetworkTags }