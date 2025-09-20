import api from "@/config/axiosClient"
import { type GameBannerDTO } from "@/interfaces/GameBannerDTO"
import type { Option } from "@/interfaces/Option";


const fetchAllGames = async (): Promise<GameBannerDTO[]> => {
    const response = await api.get<GameBannerDTO[]>("/games/");
    return response.data;
}

const fetchAllGamesOption = async (): Promise<Option[]> => {
    const response = await api.get<Option[]>("/admin/games/options")
    return response.data;
}

export default { fetchAllGames, fetchAllGamesOption };