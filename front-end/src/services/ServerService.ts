import api from "../config/axiosClient"
import type { FiltersDTO } from "@/types/FiltersDTO";

const fetchAllTags = async (): Promise<FiltersDTO> => {
    const response = await api.get<FiltersDTO>(`/servers/filters`)
    return response.data;
}

export default { fetchAllTags };