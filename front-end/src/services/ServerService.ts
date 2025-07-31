import type { Pageable } from "@/interfaces/Pageable";
import api from "../config/axiosClient"
import type { ServerGroupDTO } from "@interfaces/ServerGroupDTO"
import type { FiltersDTO } from "@/interfaces/FiltersDTO";


const fetchAllServers = async ({ page, tags, search, region } : { page: number, tags: string[], search: string, region: string|null }): Promise<Pageable<ServerGroupDTO>> => {
    const response =  await api.post<Pageable<ServerGroupDTO>>(`/server/`, {
        page: page, 
        tags: tags, 
        search: search, 
        region: region
    });
    return response.data;
}

const fetchAllTags = async (): Promise<FiltersDTO> => {
    const response = await api.get<FiltersDTO>(`/server/filters`)
    return response.data;
}

export default { fetchAllServers, fetchAllTags };