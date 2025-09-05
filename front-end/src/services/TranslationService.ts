import api from "@/config/axiosClient"
import type { TranslationDetailsDTO } from "@/interfaces/TranslationDetailsDTO";
import type { TranslationTableDTO } from "@/interfaces/TranslationTableDTO";
import type { TranslationUpdateDTO } from "@/interfaces/TranslationUpdateDTO";

const fetchAllTranslations = async (): Promise<TranslationDetailsDTO[]> => {
    const response = await api.get<TranslationDetailsDTO[]>("/admin/i18n");
    return response.data;
}

const fetchTranslationTable = async (): Promise<TranslationTableDTO> => {
    const response = await api.get<TranslationTableDTO>("/admin/i18n/table");
    return response.data;
}

const saveTranslation = async (translation: TranslationUpdateDTO) => {
    const response = await api.patch("/admin/i18n", translation);
    return response.data;
}

export default { fetchAllTranslations, saveTranslation, fetchTranslationTable };