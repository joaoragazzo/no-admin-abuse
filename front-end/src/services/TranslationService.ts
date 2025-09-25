import api from "@/config/axiosClient"
import type { TranslationDetailsDTO } from "@/types/translation/TranslationDetailsDTO";
import type { TranslationStatisticsDTO } from "@/types/translation/TranslationStatisticsDTO";
import type { TranslationTableDTO } from "@/types/translation/TranslationTableDTO";
import type { TranslationUpdateDTO } from "@/types/translation/TranslationUpdateDTO";

const fetchTranslationTable = async (): Promise<TranslationTableDTO> => {
    const response = await api.get<TranslationTableDTO>("/admin/i18n");
    return response.data;
}

const saveTranslation = async (translation: TranslationUpdateDTO): Promise<TranslationDetailsDTO> => {
    const response = await api.patch<Promise<TranslationDetailsDTO>>("/admin/i18n", translation);
    return response.data;
}

const getTranslationStatistics = async (): Promise<TranslationStatisticsDTO> => {
    const response = await api.get<TranslationStatisticsDTO>("/admin/i18n/statistics");
    return response.data;
}

export default { saveTranslation, fetchTranslationTable, getTranslationStatistics };