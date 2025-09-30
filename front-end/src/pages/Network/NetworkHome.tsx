import { NetworkServer } from "@/components/cards/NetworkBanners/NetworkServer";
import { Card } from "@/components/template/Card";
import type React from "react";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaAngleDown, FaAngleUp, FaArrowUp, FaCheck, FaDiscord, FaFile, FaGlobe, FaInfoCircle, FaInstagram, FaLink, FaServer, FaStar, FaTags, FaYoutube } from "react-icons/fa";
import { FaUserGroup, FaX } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkReviews } from "./NetworkReviews";
import { Tag } from "@/components/misc/Tag";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";
import { Loading } from "@/components/misc/Loading";
import { NetworkHeader } from "./NetworkHeader";
import { useTranslation } from "react-i18next";
import { backendI18N } from "@/i18n";

export const NetworkHome: React.FC = () => {
    const navigate = useNavigate();
    const { game } = useParams<{game: string}>();
    const { networkDetails, loading, maxPlayersCount, onlinePlayersCount } = useNetworkHome();
    const [ visibleCount, setVisibleCount ] = useState<number>(3);
    const { t } = useTranslation("network_tag", { i18n: backendI18N });

    if (loading) {
        return ( 
        <div className="bg-gray-950 py-20 flex flex-row justify-center items-center">
            <Loading>
                Carregando informações
            </Loading>
        </div>
        )
    }

    if (!networkDetails) {
        navigate("/"); 
        return;
    }

    const handleReviewStats = (n: number) => {
        const result = (networkDetails.stats.find((s) => s.rating === n)?.total || 0) / (networkDetails.reviewsCount || 1);
        return  `${result*100}%`;
    }

    return (
    <>   
        <NetworkHeader />
        
        <div className="flex justify-center items-center flex-col">
            <div className="w-full flex flex-col md:flex-row gap-10 px-10 md:px-20 xl:px-50 py-10 max-w-400">
                <div className="flex flex-col md:basis-2/3 gap-8">
                    <Card>
                        <Card.Title>
                            <FaInfoCircle className="text-blue-700"/> Sobre a Rede
                        </Card.Title>
                        <Card.Content>
                           {networkDetails.description || <span className="text-sm">(Nenhuma descrição disponível)</span>}
                        </Card.Content>
                    </Card>
                    
                    <Card>
                        <Card.Title>
                            <FaTags className="text-blue-700"/> Características das avaliações <BiInfoCircle size={15} className="text-gray-300"/>
                        </Card.Title>

                        <Card.Content>
                            
                            <div className="mb-2">
                                <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                    <FaCheck /> Características positivas
                                </div>

                                <div className="flex flex-row flex-wrap gap-3">
                                    {networkDetails.tags.filter((tag) => tag.isPositive).length === 0 
                                        && 
                                        <span className="text-sm text-slate-300">
                                            (Nenhuma tag positiva disponível para essa rede de servidores)
                                        </span>
                                    }
                                    {networkDetails.tags.filter((tag) => tag.isPositive).map(tag => (
                                        <Tag key={tag.id} color="green">
                                            {t(game + "." + tag.slug)}
                                        </Tag>
                                    ))}
                                    
                                </div>
                            </div>
                            

                            <div className="mt-8 mb-2">
                                <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center">
                                    <FaX /> Características negativas
                                </div>

                                <div className="flex flex-row flex-wrap gap-3">
                                    {networkDetails.tags.filter((tag) => !tag.isPositive).length === 0 
                                        && <span className="text-sm text-slate-300">
                                            (Nenhuma tag negativa disponível para essa rede de servidores)
                                        </span>}
                                    {networkDetails.tags.filter((tag) => !tag.isPositive).map(tag => (
                                        <Tag key={tag.id} color="red">
                                            {t(game + "." + tag.slug)}
                                        </Tag>
                                    ))}
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    <Card>
                        <Card.Title>
                            <FaServer className="text-blue-700"/> Servidores da Rede
                        </Card.Title>   

                        <Card.Content>
                            <div className="flex flex-col gap-3">
                                {networkDetails?.servers.slice(0, visibleCount).map((content, key) => (
                                    <NetworkServer
                                        key={key}
                                        server={content}
                                    />
                                ))}
                            </div>

                            {networkDetails.servers.length > 3 && 
                                <div 
                                    onClick={() => {setVisibleCount(prev => prev === 3 ? 999 : 3)}}
                                    className="btn-primary mt-3 flex justify-center h-10 font-bold text-white">
                                    Ver {visibleCount === 3 ? <>mais <FaAngleDown /></> : <>menos <FaAngleUp /></>}
                                </div>
                            }
                        </Card.Content>
                    </Card>
                </div>

                <div className="flex flex-col md:basis-1/3 gap-8">
                    <Card>
                        <Card.Title>
                            <FaFile className="text-blue-700"/> Estatísticas Rápidas
                        </Card.Title>

                        <Card.Content>
                            <div className="mt-3 text-md flex flex-col gap-2">
                                <div className="flex flex-row justify-between">
                                    <span className="flex  items-center gap-3 text-gray-100 font-semibold">
                                        <FaUserGroup className="text-green-500"/> Jogadores online
                                    </span>
                                    <span>
                                        {onlinePlayersCount}/{maxPlayersCount}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="flex items-center gap-3  text-gray-100 font-semibold">
                                        <FaStar className="text-yellow-500"/> Avaliação média
                                    </span>
                                    <span>
                                        {networkDetails.reviewsAvg}/5
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="flex items-center gap-3  text-gray-100 font-semibold">
                                        <FaArrowUp className="text-red-500"/> Total de avaliações
                                    </span>
                                    <span>
                                        {networkDetails.reviewsCount}
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
                            <div className="flex flex-col gap-1.5 text-white mt-3">
                                <div className="flex flex-row justify-between gap-3 items-center">
                                    <div className="flex flex-row items-center gap-1">
                                        <span className="min-w-3 text-sm font-bold">5</span> <FaStar className="text-yellow-400" size={12}/>
                                    </div>
                                    <div className="rounded-full w-full h-2 bg-neutral-900">
                                        <div 
                                            className={`rounded-full h-2 bg-blue-700`}
                                            style={{
                                                width: handleReviewStats(5)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between gap-3 items-center">
                                    <div className="flex flex-row items-center gap-1 text-sm font-bold">
                                        <span className="min-w-3">4</span> <FaStar className="text-yellow-400" size={12}/>
                                    </div>
                                    <div className="rounded-full w-full h-2 bg-neutral-900">
                                        <div 
                                            className={`rounded-full h-2 bg-blue-700`} 
                                            style={{
                                                width: handleReviewStats(4)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between gap-3 items-center">
                                    <div className="flex flex-row items-center gap-1 text-sm font-bold">
                                        <span className="min-w-3">3</span> <FaStar className="text-yellow-400" size={12}/>
                                    </div>
                                    <div className="rounded-full w-full h-2 bg-neutral-900">
                                        <div 
                                            className={`rounded-full h-2 bg-blue-700`} 
                                            style={{
                                                width: handleReviewStats(3)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between gap-3 items-center">
                                    <div className="flex flex-row items-center gap-1 text-sm font-bold">
                                        <span className="min-w-3">2</span> <FaStar className="text-yellow-400" size={12}/>
                                    </div>
                                    <div className="rounded-full w-full h-2 bg-neutral-900">
                                        <div 
                                            className={`rounded-full h-2 bg-blue-700`} 
                                            style={{
                                                width: handleReviewStats(2)
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-between gap-3 items-center">
                                    <div className="flex flex-row items-center gap-1 text-sm font-bold">
                                        <span className="min-w-3">1</span> <FaStar className="text-yellow-400" size={12}/>
                                    </div>
                                    <div className="rounded-full w-full h-2 bg-neutral-900">
                                        <div 
                                            className={`rounded-full h-2 bg-blue-700`} 
                                            style={{
                                                width: handleReviewStats(1)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                        </Card.Content>
                    </Card>
                </div>
            </div>
            
            <div className="w-full px-10 md:px-20 xl:px-50 max-w-400">
                <NetworkReviews />
            </div>
        </div>
    </>   
    );
}