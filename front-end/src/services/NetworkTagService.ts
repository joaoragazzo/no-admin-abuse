import api from "@/config/axiosClient"
import type { CreateNewNetworkTag } from "@/interfaces/networkTag/CreateNetworkTagDTO"
import type { NetworkTagDTO } from "@/interfaces/networkTag/NetworkTag";
import type { NetworkTagInfoDTO } from "@/interfaces/networkTag/NetworkTagInfoDTO";

const createNewNetworkTag = async (dto: CreateNewNetworkTag): Promise<NetworkTagInfoDTO> => {
    const response = await api.post<NetworkTagInfoDTO>("/admin/networktags/", dto)
    return response.data;
}

const getAllNetworkTags = async (): Promise<NetworkTagInfoDTO[]> => {
    const response = await api.get<NetworkTagInfoDTO[]>("/admin/networktags/");
    return response.data;
}

const getBasicInfoNetworkTag = async (game: string): Promise<NetworkTagDTO[]> => {
    const response = await api.get<NetworkTagDTO[]>("/networktags/" + game);
    return response.data;
}

export default { createNewNetworkTag, getAllNetworkTags, getBasicInfoNetworkTag }