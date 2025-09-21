import { CopyButtonWithPopup } from "@/components/button/CopyButttonWithPopup"
import { Tag } from "@/components/misc/Tag"
import type { ServerDTO } from "@/types/ServerDTO"
import type React from "react"
import { useTranslation } from "react-i18next"
import { FaGlobeAmericas } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"

interface NetworkServerProps { 
    server: ServerDTO,
    className?: string
}

export const NetworkServer: React.FC<NetworkServerProps> = ({ server }) => { 
    const { t: countryTranslation} = useTranslation('countries');
    const { t: tagsTranslation } = useTranslation('tags');

    return (
        <div className="flex flex-col bg-neutral-900/50 px-4 py-3 text-sm rounded-md text-gray-200 min-h-23">
            <div className="flex flex-col md:flex-row gap-1n justify-between">
                <div className="font-bold line-clamp-1">
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
                <div className="flex flex-row gap-2 mt-3 flex-wrap">
                    {server.tags.map((tag) => (
                        <Tag color={"blue"}>{tagsTranslation(tag)}</Tag>
                    ))}
                </div>
            }
        </div>
    )
}