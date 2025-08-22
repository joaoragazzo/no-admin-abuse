import { CopyButtonWithPopup } from "@/components/button/CopyButttonWithPopup"
import type { ServerDTO } from "@/interfaces/ServerDTO"
import type React from "react"
import { useTranslation } from "react-i18next"
import { FaGlobeAmericas } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"

interface NetworkServerProps { 
    server: ServerDTO
}


export const NetworkServer: React.FC<NetworkServerProps> = ({ server }) => { 
    const { t: countryTranslation} = useTranslation('countries');
    const { t: tagsTranslation } = useTranslation('tags');

    return (
        <div className="flex flex-col bg-gray-900 px-4 py-3 text-sm rounded-md text-gray-200">
            <div className="flex flex-row justify-between">
                <div className="font-bold">
                    {server.name}
                </div>
                <div className="flex flex-row gap-4">
                    <div className="text-blue-100 flex flex-col gap-1 font-bold text-nowrap">
                        <div className="flex flex-row items-center order-first gap-2 h-fit">
                            <FaGlobeAmericas /> {countryTranslation(server.country)}
                        </div>
                    </div>
                    <div className="text-green-500 flex-row flex gap-1 text-sm">
                        <div className="flex flex-row items-center order-first gap-2 h-fit">
                            <FaPeopleGroup /> {server.onlinePlayers}/{server.maxPlayers}
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="text-xs flex flex-row items-center gap-2">
                {server.ip}:{server.port} <CopyButtonWithPopup textToCopy={`${server.ip}:${server.port}`}/>
            </div>
            {server.tags.length > 0 && 
                <div className="flex flex-row gap-1 mt-3">
                    {server.tags.map((tag, index) => (
                        <div key={index} className="text-xs w-fit rounded-full bg-blue-800 text-blue-300 py-0.5 px-2">{tagsTranslation(tag)}</div>
                    ))}
                </div>
            }
        </div>
    )
}