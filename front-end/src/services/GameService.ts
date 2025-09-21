import api from "@/config/axiosClient"
import type { GameBannerDTO } from "@/types/GameBannerDTO";

import type { Option } from "@/types/Option";


const fetchAllGames = async (): Promise<GameBannerDTO[]> => {
    const response = await api.get<GameBannerDTO[]>("/games/");
    return response.data;
}

const fetchAllGamesOption = async (): Promise<Option[]> => {
    const response = await api.get<Option[]>("/admin/games/options")
    return response.data;
}

export default { fetchAllGames, fetchAllGamesOption };