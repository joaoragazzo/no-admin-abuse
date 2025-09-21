import api from "@/config/axiosClient"
import type { MessageDTO } from "@/types/MessageDTO";

const acceptEula = async (): Promise<MessageDTO> => {
    const response = await api.post("/users/consent");
    return response.data;
}

export default { acceptEula };