import type { Pageable } from "@/interfaces/Pageable";
import api from "../config/axiosClient"
import type { ServerGroupDTO } from "@interfaces/ServerGroupDTO"
import type { FiltersDTO } from "@/interfaces/FiltersDTO";


const fetchAllServers = async ({ page, tags, search } : { page: number, tags: string[], search: string }): Promise<Pageable<ServerGroupDTO>> => {
    const response =  await api.post<Pageable<ServerGroupDTO>>(`/server/`, {page: page, tags: tags, search: search});
    return response.data;
}

const fetchAllTags = async (): Promise<FiltersDTO> => {
    const response = await api.get<FiltersDTO>(`/server/filters`)
    return response.data;
}

export default { fetchAllServers, fetchAllTags };