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
        <div className="flex flex-col bg-blue-980 px-4 py-3 text-sm rounded-md text-gray-200">
            <div className="flex flex-row justify-between">
                <div className="font-bold">
                    {server.name}
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <div className="text-blue-100 flex flex-row items-center gap-1 font-bold">
                        <FaGlobeAmericas /> {countryTranslation(server.country)}
                    </div>
                    <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                        <FaPeopleGroup /> {server.onlinePlayers}/{server.maxPlayers}
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