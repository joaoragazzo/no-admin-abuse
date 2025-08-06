import { NetworkServer } from "@/components/cards/NetworkBanners/NetworkServer";
import { Rating } from "@/components/misc/Rating";
import type { NetworkDetailsDTO } from "@/interfaces/NetworkDetailsDTO";
import { fetchNetworkDetails } from "@/services/NetworkService";
import type React from "react";
import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaAngleDown, FaAngleUp, FaArrowUp, FaCheck, FaClock, FaDiscord, FaFile, FaGlobe, FaInfoCircle, FaInstagram, FaLink, FaServer, FaSkullCrossbones, FaStar, FaTags } from "react-icons/fa";
import { FaUserGroup, FaX } from "react-icons/fa6";
import { ImBubbles } from "react-icons/im";
import { MdVerified } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export const NetworkHome: React.FC = () => {
    const navigate = useNavigate();
    const { networkId } = useParams<{ networkId: string }>();
    const [ networkDetails, setNetworkDetails ] = useState<NetworkDetailsDTO>();
    const [ visibleCount, setVisibleCount ] = useState<number>(3);

    const maxPlayersCount = networkDetails?.servers.reduce((sum,acc) => sum += acc.maxPlayers, 0)
    const onlinePlayersCount = networkDetails?.servers.reduce((sum, acc) => sum += acc.onlinePlayers, 0)

    useEffect(() => {
        if (!networkId) {
            navigate("/");
            return;
        }

        fetchNetworkDetails({id: networkId})
            .then(response => setNetworkDetails(response));
    }, [])

    return (
    <>   
        <div className="px-10 md:px-20 xl:px-50 w-full bg-gray-950 flex flex-row gap-5 py-20">
            <div className="border-2 text-blue-800 border-blue-800 bg-blue-980 w-fit h-fit p-8 rounded-md">
                <FaSkullCrossbones size={33}/>
            </div>
            <div className="flex flex-col gap-2.5">
                <h2 className="font-extrabold text-3xl">{networkDetails?.name}</h2>
                <div className="flex flex-row gap-4 text-sm">
                    <div className="flex flex-row gap-3">
                        <Rating rating={4}/>
                        (342 avaliações)
                    </div>
                    •
                    <div>
                        3 servidores ativos
                    </div>
                </div>
                <div className="flex flex-row items-center gap-6">
                    <div className="bg-green-600 px-2.5 py-1 w-fit rounded-full text-xs font-semibold flex items-center gap-1.5">
                        <MdVerified /> Servidor verificado
                    </div>
                    <div className="flex flex-row items-center gap-1.5 text-xs">
                        <div className="p-1 bg-green-600 rounded-full w-fit h-fit">
                        </div>
                        <div className="text-green-600 flex items-center">
                            {onlinePlayersCount}/{maxPlayersCount} jogadores online
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        
        <div className="w-full flex justify-center">
            <div className="flex flex-row gap-10 px-10 md:px-20 xl:px-50 py-10 max-w-400">
                <div className="flex flex-col basis-2/3 gap-8">
                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="text-md font-bold items-center flex gap-3">
                            <FaInfoCircle className="text-blue-700"/> Sobre a Rede
                        </div>
                        <div className="mt-3 text-sm text-justify text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam optio, consequuntur labore ab 
                            maiores officiis voluptate aliquid maxime sapiente natus et, 
                            architecto vitae dolor accusamus! Beatae hic odit inventore qui.
                        </div>
                        <div className="mt-3 text-sm text-justify text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam optio, consequuntur labore ab 
                            maiores officiis voluptate aliquid maxime sapiente natus et, 
                            architecto vitae dolor accusamus! Beatae hic odit inventore qui.
                        </div>
                    </div>

                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="mb-3 text-md font-bold items-center flex gap-3">
                            <FaTags className="text-blue-700"/> Características das avaliações <BiInfoCircle size={15} className="text-gray-300"/>
                        </div>

                        <div>
                            <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                <FaCheck /> Características positivas
                            </div>

                            <div className="flex flex-row flex-wrap gap-3">
                                <div className="border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">
                                    Staff imparcial
                                </div>
                                <div className="border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">
                                    Eventos
                                </div>
                                <div className="border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">
                                    Baixa latência
                                </div>
                                <div className="border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">
                                    Suporte rápido
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 mb-2">
                            <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                <FaX /> Características negativas
                            </div>

                            <div className="flex flex-row flex-wrap gap-3">
                                <div className="border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">
                                    Pay-2-win
                                </div>
                                <div className="border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">
                                    VIPs muitos caros
                                </div>
                                <div className="border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">
                                    Comunidade tóxica
                                </div>
                                <div className="border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">
                                    Favoritismo
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="mb-3 text-md font-bold items-center flex gap-3">
                            <FaServer className="text-blue-700"/> Servidores da Rede
                        </div>

                        <div className="flex flex-col gap-3">
                            {networkDetails?.servers.slice(0, visibleCount).map((content, key) => (
                                <div className="border-1 rounded-md border-gray-600">
                                    <NetworkServer
                                        key={key}
                                        server={content}
                                    />
                                </div>
                            ))}
                        </div>

                        <div 
                            onClick={() => {setVisibleCount(prev => prev === 3 ? 999 : 3)}}
                            className="cursor-pointer hover:bg-blue-700 bg-blue-800 transition-all font-semibold mt-3 rounded-md gap-3 w-full p-3 flex flex-row items-center justify-center">
                            Ver {visibleCount === 3 ? <>mais <FaAngleDown /></> : <>menos <FaAngleUp /></>}
                        </div>
                        
                    </div>

                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="mb-3 items-center flex gap-3 justify-between">
                            <div className="flex flex-row items-center gap-3 font-bold text-md">
                                <ImBubbles className="text-blue-700"/> Servidores da Rede
                            </div>
                            <button className="font-bold text-xs bg-amber-500 px-2 py-1 rounded-md flex flex-row gap-1.5 items-center">
                                <FaStar /> Fazer avaliação
                            </button>
                        </div>

                        <div className="mt-3 flex flex-col gap-3">
                            <div className="bg-gray-800 px-5 rounded-md py-5">
                                <div className="flex flex-row items-center gap-3 mb-2">
                                    <div className="bg-green-700 rounded-full w-10 h-10 items-center flex justify-center">
                                        VP
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between w-full">
                                            <div className="font-bold">Vovô Penisvaldo</div>
                                            <div className="text-xs text-gray-300">Há 1 semana</div>
                                        </div>
                                        <Rating rating={2} size={14}/>
                                    </div>
                                </div>
                                <div className="text-justify text-sm text-gray-200">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                    Reiciendis error deserunt quas expedita iure incidunt quia 
                                    quod architecto, ullam saepe? Enim quae aperiam repellat 
                                    voluptate dicta reprehenderit! Ut, vero aspernatur.
                                </div>
                                
                                <div className="mt-3 flex flex-wrap flex-row gap-3">
                                    <div className="w-fit border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">Staff imparcial</div>
                                    <div className="w-fit border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">VIPs caros</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-3">
                            <div className="bg-gray-800 px-5 rounded-md py-5">
                                <div className="flex flex-row items-center gap-3 mb-2">
                                    <div className="bg-green-700 rounded-full w-10 h-10 items-center flex justify-center">
                                        VP
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row justify-between w-full">
                                            <div className="font-bold">Vovô Penisvaldo</div>
                                            <div className="text-xs text-gray-300">Há 1 semana</div>
                                        </div>
                                        <Rating rating={2} size={14}/>
                                    </div>
                                </div>
                                <div className="text-justify text-sm text-gray-200">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                                    Reiciendis error deserunt quas expedita iure incidunt quia 
                                    quod architecto, ullam saepe? Enim quae aperiam repellat 
                                    voluptate dicta reprehenderit! Ut, vero aspernatur.
                                </div>
                                
                                <div className="mt-3 flex flex-wrap flex-row gap-3">
                                    <div className="w-fit border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">Staff imparcial</div>
                                    <div className="w-fit border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">VIPs caros</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-950 font-semibold mt-3 rounded-md gap-3 w-full p-3 flex flex-row items-center justify-center">
                            Ver mais <FaAngleDown />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col basis-1/3 gap-8">
                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="text-md font-bold items-center flex gap-3">
                            <FaFile className="text-blue-700"/> Estatísticas Rápidas
                        </div>
                        <div className="mt-3 text-md flex flex-col gap-2">
                            <div className="flex flex-row justify-between">
                                <span className="flex  items-center gap-3 text-gray-400">
                                    <FaUserGroup /> Jogadores online:
                                </span>
                                <span>
                                    {onlinePlayersCount}/{maxPlayersCount}
                                </span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex items-center gap-3  text-gray-400">
                                    <FaStar /> Avaliação média:
                                </span>
                                <span>
                                    4/5
                                </span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex items-center gap-3  text-gray-400">
                                    <FaArrowUp /> Total de avaliações:
                                </span>
                                <span>
                                    392
                                </span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="flex items-center gap-3  text-gray-400">
                                    <FaClock /> Uptime:
                                </span>
                                <span>
                                    97.4%
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 px-5 py-3 rounded-md">
                        <div className="text-md font-bold items-center flex gap-3">
                            <FaLink className="text-blue-700"/> Links oficiais
                        </div>
                        <div className="mt-3 text-md flex flex-col gap-4 text-sm">
                            <span className="flex flex-row items-center gap-3 text-gray-200">
                                <FaDiscord size={18}/> discord.gg/apocalypsenetwork
                            </span>
                            <span className="flex flex-row items-center gap-3 text-gray-200">
                                <FaGlobe size={18}/> https://apocalypsenetwork.com
                            </span>
                            <span className="flex flex-row items-center gap-3 text-gray-200">
                                <FaInstagram size={18}/> instagram.com/apocalypsenetwork
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-900 px-5 py-2 rounded-md">
                        <div className="text-md font-bold items-center flex gap-3">
                            <FaStar className="text-blue-700"/> Distribuição das avaliações
                        </div>

                        <div className="mt-3 flex flex-row justify-between gap-3 items-center">
                            <div className="flex flex-row items-center gap-1">
                                <span className="min-w-3">5</span> <FaStar size={12}/>
                            </div>
                            <div className="rounded-full w-full h-2 bg-blue-950">
                                <div className="rounded-full w-[20%] h-2 bg-blue-700"></div>
                            </div>
                        </div>

                        <div className="mt-1 flex flex-row justify-between gap-3 items-center">
                            <div className="flex flex-row items-center gap-1">
                                <span className="min-w-3">4</span> <FaStar size={12}/>
                            </div>
                            <div className="rounded-full w-full h-2 bg-blue-950">
                                <div className="rounded-full w-[20%] h-2 bg-blue-700"></div>
                            </div>
                        </div>

                        <div className="mt-1 flex flex-row justify-between gap-3 items-center">
                            <div className="flex flex-row items-center gap-1">
                                <span className="min-w-3">3</span> <FaStar size={12}/>
                            </div>
                            <div className="rounded-full w-full h-2 bg-blue-950">
                                <div className="rounded-full w-[20%] h-2 bg-blue-700"></div>
                            </div>
                        </div>

                        <div className="mt-1 flex flex-row justify-between gap-3 items-center">
                            <div className="flex flex-row items-center gap-1">
                                <span className="min-w-3">2</span> <FaStar size={12}/>
                            </div>
                            <div className="rounded-full w-full h-2 bg-blue-950">
                                <div className="rounded-full w-[20%] h-2 bg-blue-700"></div>
                            </div>
                        </div>

                        <div className="mt-1 flex flex-row justify-between gap-3 items-center">
                            <div className="flex flex-row items-center gap-1">
                                <span className="min-w-3">1</span> <FaStar size={12}/>
                            </div>
                            <div className="rounded-full w-full h-2 bg-blue-950">
                                <div className="rounded-full w-[20%] h-2 bg-blue-700"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </>   
    );
}