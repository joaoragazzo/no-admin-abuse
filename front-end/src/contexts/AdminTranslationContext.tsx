import TranslationService from "@/services/TranslationService";
import type { Option } from "@/types/Option";
import type { TranslationStatisticsDTO } from "@/types/translation/TranslationStatisticsDTO";
import type { TranslationTableDTO } from "@/types/translation/TranslationTableDTO";
import type { TranslationTableFilter } from "@/types/translation/TranslationTableFilter";
import type { TranslationUpdateDTO } from "@/types/translation/TranslationUpdateDTO";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AdminTranslationType {
    statsLoading: boolean
    translationStatistics: TranslationStatisticsDTO
    translationTable: TranslationTableDTO | null
    namespacesOptions: Option[]
    handleTranslationUpdate: (translation: TranslationUpdateDTO) => void
    
    setTableFilter: React.Dispatch<React.SetStateAction<TranslationTableFilter>>
    tableFilter: TranslationTableFilter
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
    const [tableFilter, setTableFilter] = useState<TranslationTableFilter>({
        namespace: undefined,
        status: undefined,
        game: undefined
    }) 
    const [loading, setLoading] = useState(true);
    
    const namespacesOptions: Option[] = translationTable?.namespaces.map((content) => ({
        label: <span className="!font-mono">{content}</span>, 
        value: content
    })) || [];

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

    const handleTranslationUpdate = async (translation: TranslationUpdateDTO) => {
        await TranslationService.saveTranslation(translation);
        await TranslationService.getTranslationStatistics().then(
            (response) => setTranslationStatistics(response)
        );
    }

    const tableDataExposed = useMemo(() => {
        if (!translationTable) return null;

        let filtered = translationTable.content;

        if (tableFilter.namespace && tableFilter.namespace !== "") {
            filtered = filtered.filter(
                (content) => content.namespace === tableFilter.namespace
            );
        }

        if (tableFilter.status) {
            filtered = filtered.filter((content) => {
                const allTranslations = Object.values(content.translations);
                
                if (tableFilter.status === 'FILLED') {
                    return allTranslations.every(t => t.value !== null && t.value !== "");
                } else if (tableFilter.status === 'EMPTY') {
                    return allTranslations.some(t => t.value === null || t.value === "");
                }
                
                return true;
            });
        }

        return {
            ...translationTable,
            content: filtered,
        };
    }, [translationTable, tableFilter]);

    const value: AdminTranslationType = {
        statsLoading: loading,
        translationStatistics: translationStatistics,
        translationTable: tableDataExposed,
        namespacesOptions,
        handleTranslationUpdate,

        tableFilter,
        setTableFilter
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