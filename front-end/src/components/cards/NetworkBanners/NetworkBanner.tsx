import type { ServerDTO } from "@/interfaces/ServerDTO"
import { useState } from "react"
import { FaAngleRight, FaServer } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import { NetworkServer } from "./NetworkServer"
import { Rating } from "@/components/misc/Rating"
import { useNavigate, useParams } from "react-router-dom"
import { ReportNetworkPopup } from "@/components/popups/ReportNetworkPopup"
import { usePopup } from "@/hooks/usePopup"

interface NetworkBannerProps {
    id: string,
    name: string,
    rating: number,
    feedbackCount: number,
    description: string,
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
        <div className="flex flex-row border-1 border-blue-500 p-4 rounded md:w-full">
            <div className="hidden md:flex w-80 mr-3 font-bold h-maxcontent bg-blue-950 rounded items-center justify-center text-center">
                {name}
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col justift-between gap-3">
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="font-bold text-md flex items-center">
                                
                                <div className="flex items-center text-gray-200 hover:text-white cursor-pointer" onClick={() => { navigate(`/${game}/networks/${id}`) }}>
                                    {name} 
                                    <FaAngleRight size={13} className="ml-1"/>
                                </div>
                                
                                {/* <Popup
                                    trigger={<FaFlag  onClick={() => {setMoreOptions(!moreOptions)}} size={13} className="ml-3 text-gray-300 hover:text-white cursor-pointer"/>}
                                    position={'top center'}
                                    on={['hover']}
                                >
                                    <div className="text-xs px-2 py-0.5 bg-white rounded text-black">
                                        Mais opções
                                    </div>
                                </Popup>
                                <div 
                                    className={`${moreOptions ? "max-w-[1000px] opacity-100" : "max-w-0 opacity-0"} flex flex-row gap-2 text-xs font-semibold overflow-hidden transition-all duration-800 ease-in-out ml-4`}
                                >
                                    <button className="text-nowrap rounded bg-red-700 px-3 flex items-center gap-1.5 py-1 cursor-pointer hover:bg-red-800" onClick={reportPopup.openPopup}>
                                        <FaX /> Reportar servidor
                                    </button>
                                    <button className="text-nowrap rounded bg-green-500 px-3 flex items-center gap-1.5 py-1 cursor-pointer hover:bg-green-600">
                                        <FaCrown /> Reivindicar marca
                                    </button>
                                </div> */}
                                
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
                        {description}
                    </div>

                    <div className="flex justify-end flex-row gap-3 text-white">
                        <button 
                            onClick={() => {setShowServers(!showServers)}}
                            className="flex items-center gap-2 text-xs bg-blue-600 rounded px-3 py-1 font-semibold hover:bg-blue-700 cursor-pointer">
                            <FaServer /> Ver servidores
                        </button>
                     </div>
                </div>
                
                <div
                    className={`
                        mt-2.5 overflow-hidden transition-all duration-800 ease-in-out
                        ${showServers ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
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