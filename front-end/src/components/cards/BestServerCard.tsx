import { FaClock, FaGlobe, FaInfoCircle, FaMedal, FaStar, FaWifi } from "react-icons/fa"
import { FaPeopleGroup } from "react-icons/fa6"
import type { Regions } from "../enums/regions"
import { MdVerified } from "react-icons/md"

interface BestServerCardProps {
    name: string,
    administrationTeam?: string,
    uptime: number,
    ms: number,
    maxPlayer: number,
    onlinePlayers: number,
    region: Regions,
    tags: string[],
    ip: string,
    rating: number
    ratings: number,
    description: string,
    verified?:boolean
}

export const BestServerCard: React.FC<BestServerCardProps> = ({
    name,
    administrationTeam,
    uptime,
    ms,
    maxPlayer,
    onlinePlayers,
    region,
    tags,
    ip,
    rating,
    ratings,
    description,
    verified=false
}) => { 

    return ( 
        <div className="border-1 border-blue-500 mx-10 flex flex-row rounded p-5 mb-10">
            <div className="flex flex-col h-full">
                <div className="w-25 mb-2 py-0.5 rounded bg-purple-700 flex flex-row justify-center text-sm font-semibold">
                    DESTAQUE
                </div>
                <div className="h-60 w-60 font-bold rounded bg-blue-950 flex items-center justify-center">
                    {name}
                </div>
            </div>

            <div className="ml-8 flex flex-col justify-between">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center">
                        <div className="p-3 bg-yellow-600 rounded-full mr-2">
                            <FaMedal className="text-yellow-200" />
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold flex flex-row items-center gap-2">
                                {name} {verified && <MdVerified />}
                            </div>
                            <div className="font-extralight text-sm">
                                {ip}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2">
                        <div className="flex flex-row gap-1">
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                            <FaStar className="text-yellow-400" />
                        </div>
                        
                        <div className="text-xs text-gray-300">
                            {rating} ({ratings} avaliações)
                        </div>
                    </div>
                </div>
                
                <div className="text-sm">
                    {description}
                </div>

                <div className="flex flex-row gap-2">
                    {tags.map((content, key) => (
                        <div key={key} className="items-center rounded-full text-xs px-2 py-0.5 bg-blue-950 text-blue-400">{content}</div>
                    ))}
                </div>

                <div className="flex flex-row gap-3">
                    <div className="rounded bg-gray-800 p-3 flex flex-col gap-1  w-full">
                        <div className="text-xs text-gray-300">
                            Região
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm">
                            <FaGlobe className="text-blue-400" />
                            {region}
                        </div>
                    </div>

                    <div className="rounded bg-gray-800 p-3 flex flex-col gap-1  w-full">
                        <div className="text-xs text-gray-300">
                            Jogadores
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm">
                            <FaPeopleGroup className="text-green-400" />
                            {onlinePlayers}/{maxPlayer}
                        </div>
                    </div>

                    <div className="rounded bg-gray-800 p-3 flex flex-col gap-1  w-full">
                        <div className="text-xs text-gray-300">
                            Ping Médio
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm">
                            <FaWifi className="text-yellow-400" />
                            {ms}ms
                        </div>
                    </div>

                    <div className="rounded bg-gray-800 p-3 flex flex-col gap-1  w-full">
                        <div className="text-xs text-gray-300">
                            Uptime
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm">
                            <FaClock className="text-purple-400" />
                            {uptime}%
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center text-gray-300 text-sm">
                        <div className="mr-2 p-2 bg-blue-600 text-white text-xs font-bold rounded-full">
                            <FaStar />
                        </div>
                        {administrationTeam}
                    </div>

                    <div>
                        <button className="flex flex-row rounded cursor-pointer hover:bg-gray-600 items-center bg-gray-800 text-xs font-bold py-1.5 px-2.5">
                            <FaInfoCircle className="mr-2" />  Detalhes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}