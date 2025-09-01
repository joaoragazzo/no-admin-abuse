import type { TranslationDetailsDTO } from "@/interfaces/TranslationDetailsDTO"
import { PopupSkeleton } from "./PopupSkeleton"
import { Input } from "../inputs/Input"
import { FaSave } from "react-icons/fa"
import { useEffect, useState } from "react"
import TranslationService from "@/services/TranslationService"

interface EditTranslationPopupProps {
    translation: TranslationDetailsDTO | undefined
    open: boolean
    onClose: () => void
}

export const EditTranslationPopup: React.FC<EditTranslationPopupProps> = ({ translation, open, onClose }) => {
    const [newTranslation, setNewTranslation] = useState<string|undefined>(translation?.tValue);
    
    const handleNewTranslationSave = () => {
        if (!translation?.id || !newTranslation)
            return;
        
        TranslationService.saveTranslation({translation:{id: translation.id, value: newTranslation}})
    }

    useEffect(() => {
        if (open) {
          setNewTranslation(translation?.tValue); 
        }
      }, [open, translation]);

    return (
        <PopupSkeleton
            title={<>Editar a tradução de <strong>[{translation?.lang.toUpperCase()}] {translation?.tKey}</strong></>}
            open={open}
            onClose={onClose}
        >
            <div className="flex flex-row gap-3">
                <Input
                    className="max-w-18"
                    label={"Idioma"}
                    value={translation?.lang.toUpperCase()}
                    readOnly
                    disabled
                />
                
                <Input 
                    label={"TKey"}
                    value={translation?.tKey}
                    readOnly
                    disabled
                />

                <Input 
                    label={"TValue"}
                    value={newTranslation}
                    onChange={setNewTranslation}
                />     
            </div>
            <div className="flex justify-end">
                <button
                    className="btn-primary mt-4"
                    onClick={handleNewTranslationSave}
                >   
                    <FaSave /> Confirmar e Salvar
                </button>
            </div>
        </PopupSkeleton>
    )
}