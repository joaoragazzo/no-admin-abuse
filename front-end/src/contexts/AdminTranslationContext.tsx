import TranslationService from "@/services/TranslationService";
import type { TranslationStatisticsDTO } from "@/types/translation/TranslationStatisticsDTO";
import type { TranslationTableDTO } from "@/types/translation/TranslationTableDTO";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AdminTranslationType {
    statsLoading: boolean
    translationStatistics: TranslationStatisticsDTO
    translationTable: TranslationTableDTO | null
}

interface AdminTranslationContextProviderProps {
    children: React.ReactNode
}

const AdminTranslationContext = createContext<AdminTranslationType|undefined>(undefined);

export const AdminTranslationContextProvider: React.FC<AdminTranslationContextProviderProps> = ({ children }) => {
    const [translationTable, setTranslationTable] = useState<TranslationTableDTO | null>(null);
    const [translationStatistics, setTranslationStatistics] = useState<TranslationStatisticsDTO>({
      namespacesCount: 0,
      totalKeys: 0,
      completedTranslations: 0,
      pendingTranslations: 0,
    });
    const [loading, setLoading] = useState(true);

    const initialFetch = async () => {
        setLoading(true);
        const [translationTable, translationStatistics] = await Promise.all([
            TranslationService.fetchTranslationTable(),
            TranslationService.getTranslationStatistics()
        ]);

        setTranslationTable(translationTable);
        setTranslationStatistics(translationStatistics);
        setLoading(false);
    }

    useEffect(() => {
        initialFetch();
    },[])

    const value: AdminTranslationType = {
        statsLoading: loading,
        translationStatistics: translationStatistics,
        translationTable: translationTable
    }

    return ( 
        <AdminTranslationContext.Provider
            value={value}
        >
            {children}
        </AdminTranslationContext.Provider>
    )
}

export const useAdminTranslation = () => {
    const context = useContext(AdminTranslationContext);
    if (!context) 
        throw new Error('useAdminTranslation must be used inside a provider');
    return context;
}

