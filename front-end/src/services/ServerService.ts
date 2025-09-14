import api from "../config/axiosClient"
import type { FiltersDTO } from "@/interfaces/FiltersDTO";

const fetchAllTags = async (): Promise<FiltersDTO> => {
    const response = await api.get<FiltersDTO>(`/server/filters`)
    return response.data;
}

export default { fetchAllTags };