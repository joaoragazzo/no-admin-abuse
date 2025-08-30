import { FaPen, FaTrash } from "react-icons/fa";
import { PageTitle } from "./PageTitle";
import { useEffect, useState } from "react";
import type { TranslationDetailsDTO } from "@/interfaces/TranslationDetailsDTO";
import TranslationService from "@/services/TranslationService";
import { EditTranslationPopup } from "@/components/popups/EditTranslationPopup";

export const AdminTranslations: React.FC = () => {
    const [translationList, setTranslationList] = useState<TranslationDetailsDTO[]>([])
    const [editPopupOpen, setEditPopupOpen] = useState<boolean>(false);
    const [selectedTranslation, setSelectedTranslation] = useState<TranslationDetailsDTO>();

    useEffect(() => {
        TranslationService.fetchAllTranslations().then(
            (response) => {setTranslationList(response)}
        )
    },[]);

    return (
        <>
            <PageTitle 
                main="Traduções"
                backlink
            />
            <div>
                <table className="min-w-full rounded-md border border-slate-300 border-separate border-spacing-0 overflow-hidden">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-slate-200 uppercase">
                            <th className="px-6 py-3 tracking-wider border-b border-slate-200">ID</th>
                            <th className="px-6 py-3 tracking-wider border-b border-slate-200">Idioma</th>
                            <th className="px-6 py-3 tracking-wider border-b border-slate-200">Chave</th>
                            <th className="px-6 py-3 tracking-wider border-b border-slate-200">Valor</th>
                            <th className="px-6 py-3 tracking-wider border-b border-slate-200">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {translationList.map((content) => (
                            <tr className="transition-colors duration-150 text-slate-200">
                                <td className="px-6 py-4">
                                    {`${content.id.slice(0, 8)}...${content.id.slice(-8)}`}
                                </td>
                                <td className="px-6 py-4 uppercase">
                                    {content.lang}
                                </td>
                                <td className="px-6 py-4">
                                    {content.tKey}
                                </td>
                                <td className="px-6 py-4">
                                    {content?.tValue}
                                </td>
                                <td className="px-6 py-4 text-sm flex items-center h-14 gap-4">
                                    <FaTrash className="cursor-pointer"/>
                                    <FaPen className="cursor-pointer"
                                        onClick={() => {setSelectedTranslation(content);setEditPopupOpen(true)}}
                                    />
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
            <EditTranslationPopup 
                open={editPopupOpen}
                onClose={() => setEditPopupOpen(false)}
                translation={selectedTranslation!}
            />
        </>
    );
}