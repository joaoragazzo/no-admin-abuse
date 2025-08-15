import { NetworkServer } from "@/components/cards/NetworkBanners/NetworkServer";
import { Rating } from "@/components/misc/Rating";
import { Card } from "@/components/template/Card";
import type { NetworkDetailsDTO } from "@/interfaces/NetworkDetailsDTO";
import { fetchNetworkDetails } from "@/services/NetworkService";
import type React from "react";
import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaAngleDown, FaAngleUp, FaArrowRight, FaArrowUp, FaCheck, FaClock, FaDiscord, FaFile, FaGlobe, FaInfoCircle, FaInstagram, FaLink, FaServer, FaSkullCrossbones, FaStar, FaTags, FaYoutube } from "react-icons/fa";
import { FaUserGroup, FaX } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkReviews } from "./NetworkReviews";
import { Tag } from "@/components/misc/Tag";

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
            .then(response => setNetworkDetails(response))
            .catch(_ => navigate("/"));
    }, [])

    if (!networkDetails) {
        navigate("/"); 
        return;
    }

    return (
    <>   
        {/* Header */}
        <div className="bg-gray-950 py-20 flex flex-row justify-center items-center">
            <div className="flex max-w-400 gap-5 flex-grow px-10 md:px-20 xl:px-50">
                <div className="border-2 text-blue-800 border-blue-800 bg-blue-980 w-fit h-fit p-8 rounded-md">
                    <FaSkullCrossbones size={33}/>
                </div>
                <div className="flex flex-col gap-2.5 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-extrabold text-3xl">
                            {networkDetails?.name}
                        </h2>
                        <h2 
                            onClick={() => {navigate(-1)}}
                            className="font-bold text-1xl flex items-center gap-2 cursor-pointer text-gray-200 hover:text-white">
                            Voltar <FaArrowRight />
                        </h2>
                    </div>
                    
                    
                    <div className="flex flex-row gap-4 text-sm">
                        <div className="flex flex-row gap-3">
                            <Rating rating={4}/>
                            (342 avaliações)
                        </div>
                        •
                        <div>
                            {networkDetails.servers.length} servidores ativos
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
        </div>
        
        {/* Content */}
        <div className="w-full flex justify-center items-center flex-col">
            <div className="flex flex-row gap-10 px-10 md:px-20 xl:px-50 py-10 max-w-400">
                <div className="flex flex-col basis-2/3 gap-8">
                    <Card>
                        <Card.Title>
                            <FaInfoCircle className="text-blue-700"/> Sobre a Rede
                        </Card.Title>
                        <Card.Content>
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
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Title>
                            <FaTags className="text-blue-700"/> Características das avaliações <BiInfoCircle size={15} className="text-gray-300"/>
                        </Card.Title>

                        <Card.Content>
                            
                            <div className="mt-3 mb-2">
                                <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                    <FaCheck /> Características positivas
                                </div>

                                <div className="flex flex-row flex-wrap gap-3">
                                    <Tag color="green">
                                        Staff imparcial
                                    </Tag>
                                    <Tag color="green">
                                        Eventos
                                    </Tag>
                                    <Tag color="green">
                                        Baixa latência
                                    </Tag>
                                    <Tag color="green">
                                        Suporte rápido
                                    </Tag>
                                </div>
                            </div>
                            

                            <div className="mt-8 mb-2">
                                <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                    <FaX /> Características negativas
                                </div>

                                <div className="flex flex-row flex-wrap gap-3">
                                    <Tag color="red">
                                        Pay-2-win
                                    </Tag>
                                    <Tag color="red">
                                        VIPs muitos caros
                                    </Tag>
                                    <Tag color="red">
                                        Comunidade tóxica
                                    </Tag>
                                    <Tag color="red">
                                        Favoritismo
                                    </Tag>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Title>
                            <FaServer className="text-blue-700"/> Servidores da Rede
                        </Card.Title>   

                        <Card.Content>
                            <div className="flex flex-col gap-3 mt-3">
                                {networkDetails?.servers.slice(0, visibleCount).map((content, key) => (
                                    <div className="border-1 rounded-md border-gray-600">
                                        <NetworkServer
                                            key={key}
                                            server={content}
                                        />
                                    </div>
                                ))}
                            </div>

                            {networkDetails.servers.length > 3 && 
                                <div 
                                    onClick={() => {setVisibleCount(prev => prev === 3 ? 999 : 3)}}
                                    className="cursor-pointer hover:bg-blue-800 bg-blue-900 transition-all font-semibold mt-3 rounded-md gap-3 w-full p-3 flex flex-row items-center justify-center">
                                    Ver {visibleCount === 3 ? <>mais <FaAngleDown /></> : <>menos <FaAngleUp /></>}
                                </div>
                            }
                        </Card.Content>
                    </Card>
                </div>

                <div className="flex flex-col basis-1/3 gap-8">
                    <Card>
                        <Card.Title>
                            <FaFile className="text-blue-700"/> Estatísticas Rápidas
                        </Card.Title>

                        <Card.Content>
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
                        </Card.Content>
                    </Card>
                    
                    {(networkDetails.discord || networkDetails.youtube || networkDetails.website || networkDetails.instagram) &&
                    <Card>
                        <Card.Title>
                            <FaLink className="text-blue-700"/> Links oficiais
                        </Card.Title>
                        
                            <div className="mt-3 text-md flex flex-col gap-4 text-sm">
                                {networkDetails.discord && 
                                    <span className="flex flex-row items-center gap-3 text-gray-200">
                                        <FaDiscord size={18}/> {networkDetails.discord}
                                    </span>
                                }

                                {networkDetails.youtube &&
                                    <span className="flex flex-row items-center gap-3 text-gray-200">
                                        <FaYoutube size={18}/> {networkDetails.youtube}
                                    </span>
                                }

                                {networkDetails.website &&
                                    <span className="flex flex-row items-center gap-3 text-gray-200">
                                        <FaGlobe size={18}/> {networkDetails.website}
                                    </span>
                                }
                                
                                {networkDetails.instagram && 
                                    <span className="flex flex-row items-center gap-3 text-gray-200">
                                        <FaInstagram size={18}/> {networkDetails.instagram}
                                    </span>
                                }
                            </div>
                    </Card>
                    }

                    <Card>
                        <Card.Title>
                            <FaStar className="text-blue-700"/> Distribuição das avaliações
                        </Card.Title>

                        <Card.Content>
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
                        </Card.Content>
                    </Card>
                </div>
            </div>
            
            <NetworkReviews />
        </div>
    </>   
    );
}