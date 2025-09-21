import type { ServerDTO } from "@/interfaces/ServerDTO"
import { useState } from "react"
import { FaAngleRight, FaServer } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { NetworkServer } from "./NetworkServer"
import { Rating } from "@/components/misc/Rating"
import { useNavigate, useParams } from "react-router-dom"
import { ReportNetworkPopup } from "@/components/popups/ReportNetworkPopup"
import { usePopup } from "@/hooks/usePopup"
import { Button } from "antd"

interface NetworkBannerProps {
    id: string,
    name: string,
    rating: number,
    feedbackCount: number,
    description: string | undefined,
    servers: ServerDTO[]
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
    id,
    name,
    rating,
    feedbackCount,
    description,
    servers,
}) => {
    const navigate = useNavigate();
    const [showServers, setShowServers] = useState<boolean>(false);
    // const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const { game } = useParams();
    const reportPopup = usePopup();
    return (
        <>
        <div className="flex flex-col border-1 border-neutral-700 p-4 rounded md:w-full">
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row gap-3">
                    <div className="bg-neutral-900 max-w-34 min-w-34 aspect-square items-center flex justify-center uppercase font-bold rounded-md text-center overflow-hidden text-ellipsis">
                        {name}
                    </div>
                    <div className="flex flex-col justify-between gap-3 w-full">
                        <div>
                            <div className="flex flex-row justify-between">
                                <div className="font-bold text-md flex items-center">
                                    
                                    <div className="flex items-center text-gray-200 hover:text-white cursor-pointer" onClick={() => { navigate(`/${game}/networks/${id}`) }}>
                                        {name} 
                                        <FaAngleRight size={13} className="ml-1"/>
                                    </div>     
                                </div>
                
                                <div className="flex flex-row gap-4">
                                    <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                                        <FaPeopleGroup /> {servers.reduce((acc, curr) => acc + curr.onlinePlayers, 0)}/{servers.reduce((acc, curr) => acc + curr.maxPlayers, 0)}
                                    </div>
                                </div>
                            </div>
                                            
                            <div className="text-xs text-gray-300 flex items-center gap-1">
                                {servers.length} servidor{servers.length != 1 && "es"}
                            </div>
                        </div>
                                    
                        <div className="flex flex-row gap-2 text-xs">
                        <Rating rating={rating} />
                            <div className="text-gray-400 flex flex-row items-center">
                                ({feedbackCount} avaliações)
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-400 line-clamp-2">
                            {description || "(Nenhuma descrição disponível)"}
                        </div>

                        <div className="flex justify-end flex-row gap-3 text-white">
                            <Button
                                onClick={() => {setShowServers(!showServers)}}
                                size="small"
                                icon={<FaServer />}
                            >
                                Ver servidores
                            </Button>
                        </div>
                    </div>
                </div>
                <div
                    className={`
                        overflow-hidden transition-all duration-800 ease-in-out
                        ${showServers ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
                        flex flex-col gap-2.5
                    `}
                >
                    {servers.map((server, index) => (
                        <NetworkServer key={index} server={server} />
                    ))}
                </div>
                
            </div>
            
        </div>

        <ReportNetworkPopup 
            open={reportPopup.open}
            onClose={reportPopup.closePopup}
            name={name}
        />
        </>
    )
}