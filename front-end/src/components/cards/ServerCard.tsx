import type { ServerDTO } from "@/interfaces/ServerDTO"
import { useState } from "react"
import { FaCopy, FaStar } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"

interface ServerCardProps {
    name: string,
    maxPlayers: number,
    onlinePlayers: number,
    rating: number,
    feedbackCount: number,
    description: string,
    servers: ServerDTO[]
}

export const ServerCard: React.FC<ServerCardProps> = ({
    name,
    maxPlayers,
    onlinePlayers,
    rating,
    feedbackCount,
    description,
    servers
}) => {
    const [showServers, setShowServers] = useState(false);

    return (
        <div className="flex flex-row border-1 border-blue-500 p-4 rounded">
            <div className="mr-3 font-bold w-50 h-30 bg-blue-950 rounded items-center flex justify-center text-center">
                {name}
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col justift-between gap-3">
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="font-bold text-md">
                                {name}
                            </div>
            
                            <div className="flex flex-row gap-4">
                                <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                                    <FaPeopleGroup /> {onlinePlayers}/{maxPlayers}
                                </div>
            
                                <button className="flex flex-row items-center text-xs bg-blue-500 px-3 rounded font-bold hover:bg-blue-600 cursor-pointer" onClick={() => {setShowServers(!showServers)}}>Ver servidores</button>
                            </div>
                        </div>
                                        
                        <div className="text-xs text-gray-300">
                            {servers.length} servidor{servers.length != 1 && "es"}
                        </div>
                    </div>
                                
                    <div className="flex flex-row gap-2 text-sm item-center">
                        <div className="flex flex-row gap-1">
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i}
                                    className={
                                        i < Math.floor(rating) ? "text-amber-300" : "text-gray-400/40"
                                    }
                                />
                            ))}
                        </div>
                                        
                        <div className="text-gray-500 text-xs">
                            {rating} ({feedbackCount} avaliações)
                        </div>
                    </div>

                    <div className="text-sm text-gray-400">
                        {description}
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
                        <div key={index} className="flex flex-col bg-blue-980 px-4 py-3 text-sm rounded-md text-gray-200">
                            <div className="flex flex-row justify-between">
                                <div className="font-bold">
                                    {server.name}
                                </div>
                                <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                                    <FaPeopleGroup /> {onlinePlayers}/{maxPlayers}
                                </div>
                            </div>
                            <div className="text-xs flex flex-row items-center gap-2">
                                {server.ip}:{server.port} <FaCopy onClick={async () => {await navigator.clipboard.writeText(`${server.ip}:${server.port}`)}} size={11} className="text-gray-200 cursor-pointer"/>
                            </div>
                            {server.tags.length > 0 && 
                                <div className="flex flex-row gap-1 mt-3">
                                    {server.tags.map((tag, index) => (
                                        <div key={index} className="text-xs w-fit rounded-full bg-blue-800 text-blue-300 py-0.5 px-2">{tag}</div>
                                    ))}
                                </div>
                            }
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}