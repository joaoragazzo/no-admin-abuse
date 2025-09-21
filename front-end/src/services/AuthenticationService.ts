import api from "@/config/axiosClient"
import type { AuthenticationDTO } from "@/types/AuthenticationDTO"

const steamLoginCallback = async ({ params }: { params:string }): Promise<AuthenticationDTO> => {
    const response = await api.get<AuthenticationDTO>("/auth/steam/callback" + params);
    return response.data;
}

const steamLoginProfile = async (): Promise<AuthenticationDTO> => {
    const response = await api.get<AuthenticationDTO>("auth/steam/profile");
    return response.data;
}

export default { steamLoginCallback, steamLoginProfile }