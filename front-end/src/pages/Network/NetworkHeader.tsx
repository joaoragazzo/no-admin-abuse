import { Rating } from "@/components/misc/Rating";
import { ServerStatus } from "@/components/misc/ServerStatus";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";
import type React from "react";
import { FaArrowRight, FaSkullCrossbones } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const NetworkHeader: React.FC = () => {
    const { networkDetails, maxPlayersCount, onlinePlayersCount } = useNetworkHome();
    const navigate = useNavigate();
    
    return (
        <div className="bg-neutral-900/50 py-20 flex flex-row justify-center items-center">
            <div className="flex max-w-400 gap-5 flex-grow px-10 md:px-20 xl:px-50">
                <div className="border-2 text-blue-800 border-blue-800 bg-blue-980 w-fit h-fit p-8 rounded-md">
                    <FaSkullCrossbones size={33}/>
                </div>
                <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-extrabold sm:text-3xl text-2xl text-neutral-100">
                            {networkDetails?.name}
                        </h2>
                        <h2 
                            onClick={() => {navigate(-1)}}
                            className="text-neutral-300 hover:text-white font-bold text-1xl flex items-center gap-2 cursor-pointer hover:scale-102 transition-all">
                            Voltar <FaArrowRight />
                        </h2>
                    </div>
                    
                    
                    <div className="flex flex-row gap-4 text-sm text-neutral-300">
                        <div className="sm:flex flex-row gap-3">
                            <Rating rating={networkDetails!.reviewsAvg}/>
                            <div className="hidden sm:flex">
                                ({networkDetails?.reviewsCount} avaliações)
                            </div>
                        </div>
                        <div className="sm:flex hidden">
                            •
                        </div>
                        <div className="sm:flex hidden"> 
                            {networkDetails?.servers.length} servidores ativos
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
                        <div className="bg-green-600 px-2.5 py-1 w-fit rounded-full text-xs font-semibold flex items-center gap-1.5 text-nowrap">
                            <MdVerified /> Servidor verificado
                        </div>
                        <ServerStatus status="online" text={`${onlinePlayersCount}/${maxPlayersCount} jogadores online`}/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}