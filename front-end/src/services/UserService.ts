import api from "@/config/axiosClient"
import type { MessageDTO } from "@/interfaces/MessageDTO";

const acceptEula = async (): Promise<MessageDTO> => {
    const response = await api.post("/user/consent");
    return response.data;
}

export default { acceptEula };