import api from "@/config/axiosClient"
import type { TranslationDetailsDTO } from "@/types/translation/TranslationDetailsDTO";
import type { TranslationTableDTO } from "@/types/translation/TranslationTableDTO";
import type { TranslationUpdateDTO } from "@/types/translation/TranslationUpdateDTO";

const fetchAllTranslations = async (): Promise<TranslationDetailsDTO[]> => {
    const response = await api.get<TranslationDetailsDTO[]>("/admin/i18n");
    return response.data;
}

const fetchTranslationTable = async (): Promise<TranslationTableDTO> => {
    const response = await api.get<TranslationTableDTO>("/admin/i18n/table");
    return response.data;
}

const saveTranslation = async (translation: TranslationUpdateDTO): Promise<TranslationDetailsDTO> => {
    const response = await api.patch<Promise<TranslationDetailsDTO>>("/admin/i18n", translation);
    return response.data;
}

export default { fetchAllTranslations, saveTranslation, fetchTranslationTable };