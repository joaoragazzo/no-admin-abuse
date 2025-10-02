import api from "@/config/axiosClient";
import type { HomepageStatsDTO } from "@/types/stats/HomepageStatsDTO";

export const homepageStats = async (): Promise<HomepageStatsDTO> => {
    const response = await api.get<HomepageStatsDTO>('/stats/homepage');
    return response.data;
}

export default { homepageStats}