import type React from "react"
import { FaArrowRight, FaStar } from "react-icons/fa"

interface RatedServerProps {
    serverName: string,
    serverIcon: React.ReactNode
    online: boolean
    description: string,
    badTags: string[],
    goodTags: string[],
    rating: number
}

export const RatedServer: React.FC<RatedServerProps> = ({ serverName, serverIcon, online, description, badTags, goodTags, rating }) => {
    return (
        <div className="h-full border-1 border-gray-500/100 rounded-md p-5 flex flex-col justify-between gap-5">
            <div className="flex flex-col gap-5">
                {/* Cabeçalho */}
                <div className="flex flex-row gap-5 items-center">
                <div className="p-4 bg-blue-200 text-blue-700 w-fit rounded-full">
                    {serverIcon}
                </div>    
                <div className="font-bold flex flex-col flex-1 w-full gap-1">
                    <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 items-center">
                        {serverName} <div className="text-xs px-2 py-0.5 w-fit h-fit bg-blue-200 text-blue-700 rounded font-normal">DayZ</div>
                    </div>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        {online ? <>
                            <div className="bg-green-100 p-1 rounded-full">
                                <div className="bg-green-500 p-0.5 rounded-full"></div>
                            </div>
                            <small className="font-normal text-green-400">Online</small>
                        </> : <>
                            <div className="bg-yellow-100 p-1 rounded-full">
                                <div className="bg-yellow-500 p-0.5 rounded-full"></div>
                            </div>
                            <small className="font-normal text-yellow-400">Offline</small>
                        </>
                        }
                    </div>
                </div>    
                <div className="flex flex-row gap-1.5">
                    {[...Array(5)].map((_, i) => (
                        <FaStar 
                            key={i}
                            className={
                                i < Math.floor(rating) ? "text-amber-300" : "text-gray-400/40"
                            }
                        />
                    ))}
                </div> 
                </div>  
                {/* Tags */}
                <div className="flex flex-row gap-2">
                    {badTags.map((content, key) => (
                        <div key={key} className="text-xs px-2 py-0.5 bg-red-200 text-red-700 rounded">
                            {content}
                        </div>  
                    ))}

                    {goodTags.map((content, key) => (
                        <div key={key} className="text-xs px-2 py-0.5 bg-green-200 text-green-700 rounded">
                            {content}
                        </div>  
                    ))}
                </div>
                {/* Description */}
                <div className="text-pretty">
                {description}
                </div>
            </div>
            
            {/* Footer */}
            <div className="flex flex-row justify-between">
              <small className="text-blue-500 hover:text-blue-400 cursor-pointer">Ver detalhes</small>
              <small className="flex flex-row items-center gap-1.5 cursor-pointer hover:text-white text-gray-200">Ver detalhes <FaArrowRight /></small>
            </div>
        </div>
    )
}