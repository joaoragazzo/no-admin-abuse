import api from "@/config/axiosClient"
import type { UserFullInfoDTO } from "@/types/user/UserFullInfoDTO";

const acceptEula = async (): Promise<void> => {
    const response = await api.post<void>("/users/consent");
    return response.data;
}

const getAllUsers = async (): Promise<UserFullInfoDTO[]> => {
    const response = await api.get<UserFullInfoDTO[]>("/admin/users/");
    return response.data;
}

export default { acceptEula, getAllUsers };