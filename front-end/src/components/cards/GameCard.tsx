import { Button } from "antd"
import type React from "react"
import { Link } from "react-router-dom"
import { CountUp } from "../misc/CountUp"

interface GameCardProps {
    id: string,
    gameName: string,
    networkCount: number,
    serverCount: number,
    ratingCount: number,
    bgImage: string,
}


export const GameCard: React.FC<GameCardProps> = ({ id, gameName, networkCount, serverCount, ratingCount, bgImage}) => {
    return (
        <div className="hover:translate-y-[-3px] transition-transform duration-200 rounded-xl bg-neutral-950 border-1 border-neutral-700 overflow-hidden flex flex-col justify-between">
            <div
                className="w-full h-40 bg-cover bg-center rounded-t"
                style={{ backgroundImage: `url('/${bgImage}')` }}
            />

            <div className="p-5">
                <div className="text-center font-bold text-2xl">
                    {gameName}
                </div>
                <div className="mt-4 flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Redes de Servidores:</span>
                        <span className="text-gray-200"><CountUp end={networkCount} /></span>                                        
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Servidores:</span>
                        <span className="text-gray-200"><CountUp end={serverCount} /></span>                                        
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Avaliações:</span>
                        <span className="text-gray-200"><CountUp end={ratingCount} /></span>                                        
                    </div>
                </div>
                        
                <Link to={`/${id}/networks/`} className="mt-6 w-full flex items-center justify-center">
                    <Button type="primary">Ver Redes de Servidores</Button>
                </Link>
            </div>
        </div>            
    )
}