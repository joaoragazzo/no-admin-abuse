import { FaCirclePlus } from "react-icons/fa6";
import { PageTitle } from "./PageTitle";
import { Tag } from "@/components/misc/Tag";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export const AdminTags: React.FC = () => {
    return (
        <div>
            <PageTitle 
                main="Configurações de"
                emphasis="Tags"
                backlink
            /> 
            <div className="flex flex-row gap-5">
                
            <div className="w-full">
                <div className="flex flex-col gap-0.5 w-full">
                    <div className="relative flex flex-row justify-end items-center py-2 rounded-md w-full">
                        <button className="btn-primary">
                            <FaCirclePlus className=""/> Adicionar Tag
                        </button>
                    </div>
                </div>
                    <table className="min-w-full rounded-md border border-slate-300 border-separate border-spacing-0 overflow-hidden">
                        <thead>
                            <tr className="text-left text-xs font-semibold text-slate-200 uppercase">
                                <th className="px-6 py-3 tracking-wider border-b border-slate-200">ID</th>
                                <th className="px-6 py-3 tracking-wider border-b border-slate-200">Tag</th>
                                <th className="px-6 py-3 tracking-wider border-b border-slate-200">Criado em</th>
                                <th className="px-6 py-3 tracking-wider border-b border-slate-200">Status</th>
                                <th className="px-6 py-3 tracking-wider border-b border-slate-200">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className="transition-colors duration-150 text-slate-200 text-sm">
                                <td className="px-6 py-4">1234...567</td>
                                <td className="px-6 py-4">
                                    <Tag color="red" className="w-fit">
                                        BAD ADMIN
                                    </Tag>
                                </td>
                                <td className="px-6 py-4">01/09/2003</td>
                                <td className="px-6 py-4">
                                    <Tag color="green" className="w-min items-center flex">
                                        Ativo
                                    </Tag>
                                </td>
                                <td className="px-6 py-4 text-sm flex items-center h-14 gap-4">
                                    <FaEye className="cursor-pointer"/>
                                    <FaTrash className="cursor-pointer"/>
                                    <FaPen className="cursor-pointer"/>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    );
}