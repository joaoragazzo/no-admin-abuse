import api from "@/config/axiosClient"
import { type GameBannerDTO } from "@/interfaces/GameBannerDTO"


const fetchAllGames = async (): Promise<GameBannerDTO[]> => {
    const response = await api.get<GameBannerDTO[]>("/games/");
    return response.data;
}

export default { fetchAllGames };