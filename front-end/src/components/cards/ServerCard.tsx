import { FaGlobe, FaStar } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"

interface ServerCardProps {
    name: string,
    tags: string[],
    maxPlayers: number,
    onlinePlayers: number,
    region: "NA" | "EU" | "SA" | "OC" | "AS",
    ip: string,
    rating: number,
    feedbackCount: number,
    description: string,
}

export const ServerCard: React.FC<ServerCardProps> = ({
    name,
    tags,
    maxPlayers,
    onlinePlayers,
    region,
    ip,
    rating,
    feedbackCount,
    description
}) => {
    return (
        <div className="flex flex-row border-1 border-blue-500 p-4 rounded">
            <div className="mr-3 font-bold w-50 h-30 bg-blue-950 rounded items-center flex justify-center">
                {name}
            </div>
            <div className="flex flex-col justify-between w-full">
                <div>
                    <div className="flex flex-row justify-between">
                        <div className="font-bold text-md">
                            {name}
                        </div>
        
                        <div className="flex flex-wrap gap-3">
                            {tags.map((content, key) => (
                                <div key={key} className="px-2 text-nowrap my-1 text-xs rounded-full bg-blue-950 text-blue-400">
                                    {content}
                                </div>   
                            ))}
                            
                        </div>
        
                        <div className="flex flex-row gap-4">
                            <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                                <FaPeopleGroup /> {onlinePlayers}/{maxPlayers}
                            </div>
        
                            <div className="text-blue-400 flex-row flex items-center gap-1 text-sm">
                                <FaGlobe /> {region}
                            </div>
        
                            <button className="flex flex-row items-center text-xs bg-blue-500 px-3 rounded font-bold hover:bg-blue-600 cursor-pointer">Conectar</button>
                        </div>
                    </div>
                                    
                    <div className="text-xs">
                        {ip}
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
        </div>
    )
}