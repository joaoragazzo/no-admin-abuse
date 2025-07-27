import type { Pageable } from "@/interfaces/Pageable";
import api from "../config/axiosClient"
import type { ServerGroupDTO } from "@interfaces/ServerGroupDTO"

const fetchAllServers = async ({ page } : { page: number }): Promise<Pageable<ServerGroupDTO>> => {
    const response =  await api.get<Pageable<ServerGroupDTO>>(`/server/?page=${page-1}`);
    return response.data;
}

export default { fetchAllServers };