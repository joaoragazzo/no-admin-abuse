import api from "@/config/axiosClient"
import type { AuthenticationDTO } from "@/interfaces/AuthenticationDTO"

const steamLoginCallback = async ({ params }: { params:string }): Promise<AuthenticationDTO> => {
    const response = await api.get<AuthenticationDTO>("/auth/steam/callback" + params);
    return response.data;
}

export default { steamLoginCallback }