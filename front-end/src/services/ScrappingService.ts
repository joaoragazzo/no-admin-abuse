import api from "@/config/axiosClient"
import type { GameplayTagDTO } from "@/types/scrapping/GameplayTagDTO"

const getAllGameplayTags = async ({game} : {game: string}): Promise<GameplayTagDTO[]> => {
    const response = await api.get<GameplayTagDTO[]>(`/admin/scrapping/${game}`);
    return response.data;
}

export default { getAllGameplayTags };