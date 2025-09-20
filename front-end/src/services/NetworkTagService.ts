import api from "@/config/axiosClient"
import type { CreateNewNetworkTag } from "@/interfaces/networkTag/CreateNetworkTagDTO"

const createNewNetworkTag = async (dto: CreateNewNetworkTag) => {
    const response = await api.post("/admin/networktags/", dto)

    return response.data;
}

export default { createNewNetworkTag }