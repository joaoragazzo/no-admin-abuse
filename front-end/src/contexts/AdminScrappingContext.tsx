import GameService from "@/services/GameService";
import ScrappingService from "@/services/ScrappingService";
import type { Option } from "@/types/Option";
import type { GameplayTagDTO } from "@/types/scrapping/GameplayTagDTO";
import React, { createContext, useContext, useEffect, useState } from "react";


interface AdminScrappingType {
    gameList: Option[]
    gameSelected: string | undefined
    gameplayTags: GameplayTagDTO[]

    setGameSelected: (id: string) => void
    setGameplayTags: React.Dispatch<React.SetStateAction<GameplayTagDTO[]>>

    handleDeleteGameplayTag: (id: string) => void
    handleDeleteGameplayTagAlias: (gameplayTagId: string, aliasId: string) => void
}

const AdminScrappingContext = createContext<AdminScrappingType | undefined>(undefined);


interface AdminScrappingContextProviderProps {
    children: React.ReactNode
}

export const AdminScrappingContextProvider: React.FC<AdminScrappingContextProviderProps> = ({ children }) => {
    const [gameList, setGameList] = useState<Option[]>([]);
    const [gameSelected, setGameSelected] = useState<string>();
    const [gameplayTags, setGameplayTags] = useState<GameplayTagDTO[]>([]);

    useEffect(() => {
        GameService.fetchAllGamesOption().then(res => {
          setGameList(res);
          setGameSelected(res[0].value);
          ScrappingService.getAllGameplayTags({game: res[0].value}).then(response => setGameplayTags(response));
        });
    }, []);
    
    useEffect(() => {
      if (gameSelected)
        ScrappingService.getAllGameplayTags({game: gameSelected}).then(response => setGameplayTags(response));
    }, [gameSelected]);

    const handleDeleteGameplayTag = (id: string) => {
        setGameplayTags((prev) => prev.filter((data) => data.id !== id))
    }

    const handleDeleteGameplayTagAlias = (gameplayTagId: string, aliasId: string) => {
        setGameplayTags((prev) =>
            prev.map((tag) => 
            tag.id === gameplayTagId
                ? { ...tag, aliases: tag.aliases.filter((alias) => alias.id !== aliasId) }
                : tag
            )
        );
    };

    const value: AdminScrappingType = {
        gameList: gameList,
        gameSelected: gameSelected,
        gameplayTags: gameplayTags,

        setGameSelected: setGameSelected,
        setGameplayTags: setGameplayTags,
        handleDeleteGameplayTag: handleDeleteGameplayTag,
        handleDeleteGameplayTagAlias: handleDeleteGameplayTagAlias
    }

    return (
        <AdminScrappingContext.Provider
            value = {value}
        >
            {children}
        </AdminScrappingContext.Provider>
    )
}

export const useAdminScrappingContext = () => {
    const context = useContext(AdminScrappingContext);
    if (!context) 
        throw new Error('useAdminTranslation must be used inside a provider');
    return context;
}