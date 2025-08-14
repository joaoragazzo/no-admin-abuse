import { ReviewCard } from "@/components/cards/ReviewCard";
import { TextArea } from "@/components/inputs/TextArea";
import { Rating } from "@/components/misc/Rating";
import { Pagination } from "@/components/table/Pagination";
import { Card } from "@/components/template/Card";
import type React from "react";
import { FaCheck, FaFilter } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { ImBubbles } from "react-icons/im";

export const NetworkReviews: React.FC = () => {
    return (
        <div className="px-10 md:px-20 mb-10">
            <Card.Title>
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row items-center gap-3 font-bold text-md">
                        <ImBubbles className="text-blue-700"/> Avaliações
                    </div>
                    <button className="text-xs font-bold px-7 items-center flex flex-row gap-2 text-gray-100 border-1 border-gray-400 py-1.5 rounded-md cursor-pointer">
                        <FaFilter /> Ordenar por
                    </button>
                </div>
            </Card.Title>


            <div className="flex flex-col gap-2 mt-3">             
                <div className="flex flex-row gap-3 text-gray-200">
                    Nota: <Rating rating={3}/>
                </div>

                <div className="mb-2">
                    <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                        <FaCheck /> Características positivas
                    </div>

                    <div className="flex flex-row flex-wrap gap-3">
                        <div className="border-1 rounded-full border-green-600 text-xs px-3 py-0.5 text-green-600 bg-green-100 font-medium">
                            Staff imparcial
                        </div>
                        <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                            Eventos
                        </div>
                        <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                            Baixa latência
                        </div>
                        <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                            Suporte rápido
                        </div>
                    </div>
                    
                    <div className="mt-2">
                        <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center">
                            <FaX/> Características negativas
                        </div>
                
                        <div className="flex flex-row flex-wrap gap-3">
                            <div className="border-1 rounded-full border-red-600 text-xs px-3 py-0.5 text-red-600 bg-red-100 font-medium">
                                Pay-2-win
                            </div>
                            <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                                VIPs muitos caros
                            </div>
                            <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                                Comunidade tóxica
                            </div>
                            <div className="border-1 rounded-full border-gray-600 text-xs px-3 py-0.5 text-gray-600 bg-gray-300 font-medium">
                                Favoritismo
                            </div>
                        </div>
                    </div>
                </div>
                
                <TextArea 
                    placeholder="Faça sua avaliação a rede"
                    maxCharacters={3000}
                />
                
                <div className="w-full flex items-end justify-end gap-3">
                    <button className="btn-primary">
                        Publicar avaliação
                    </button>
                </div>  
            </div>            
            <ReviewCard />
            <ReviewCard /> 
            <ReviewCard /> 
            <ReviewCard />

            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}}/>
        </div>
    )
}