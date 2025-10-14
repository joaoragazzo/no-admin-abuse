import api from "@/config/axiosClient"
import type { GameplayTagDTO } from "@/types/scrapping/GameplayTagDTO"

const getAllGameplayTags = async (): Promise<GameplayTagDTO[]> => {
    const response = await api.get<GameplayTagDTO[]>("/admin/scrapping/");
    return response.data;
}

export default { getAllGameplayTags };