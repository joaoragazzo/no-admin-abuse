import type React from "react"
import { Link } from "react-router-dom"

interface GameCardProps {
    id: string,
    gameName: string,
    serverCount: string,
    reportsCount: string,
    bgImage: string,
}


export const GameCard: React.FC<GameCardProps> = ({ id, gameName, serverCount, reportsCount, bgImage}) => {
    return (
        <div className="grid grid-cols-3 gap-3 mx-30 mb-10">
            <div className="hover:translate-y-[-3px] transition-transform duration-200 rounded bg-gray-900 overflow-hidden flex flex-col justify-between">
                <div
                    className="w-full h-40 bg-cover bg-center rounded-t"
                    style={{ backgroundImage: `url('/${bgImage}')` }}
                />

                <div className="p-5">
                    <div className="bg-gray-900 text-center font-bold text-2xl">
                        {gameName}
                    </div>

                    <div className="mt-4 flex flex-col gap-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Servidores:</span>
                            <span className="text-gray-300">{serverCount}</span>                                        
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Denúncias:</span>
                            <span className="text-red-400">{reportsCount}</span>                                        
                        </div>
                    </div>
                            
                    <Link to={`/servers/${id}`} className="mt-6 w-full flex items-center justify-center">
                        <button className="bg-blue-500 px-10 py-2 rounded hover:bg-blue-600 cursor-pointer text-sm">Ver Servidores</button>
                    </Link>
                </div>
            </div>        
        </div>
    )
}