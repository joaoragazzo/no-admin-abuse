import type React from "react";
import { Brand } from "../Brand";
import { FaDiscord, FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <div className="items-center w-full px-7 py-3 border-t-1 border-gray-700/60 bg-gray-950 flex flex-col gap-3">
            <div className="items-center flex flex-row justify-between w-full">
                <div>
                    <Brand />
                    <small className="text-gray-400">
                        Promovendo justiça na administração de jogos online
                    </small>
                </div>
                
                <div className="flex flex-row gap-5">
                    <div className="p-3 bg-blue-950 rounded-full w-fit h-fit cursor-pointer">
                        <FaDiscord />
                    </div>
                    <div className="p-3 bg-blue-950 rounded-full w-fit h-fit cursor-pointer">
                        <FaGithub />
                    </div>
                </div>
            </div>
            

            <div className="text-gray-500 text-xs pt-2 border-t-1 border-gray-700/40 w-full justify-between flex flex-row">
                <div>
                    © No Admin Abuse
                </div>
                <div className="flex flex-row gap-10">
                    <div className="cursor-pointer hover:underline flex flex-row gap-1 items-center"><FaExternalLinkAlt /> Termos de Uso</div>
                    <div className="cursor-pointer hover:underline flex flex-row gap-1 items-center"><FaExternalLinkAlt /> Termos de Privacidade</div>
                    <div className="cursor-pointer hover:underline flex flex-row gap-1 items-center"><FaExternalLinkAlt /> Contato</div>
                </div>
            </div>
        </div>
    )
}