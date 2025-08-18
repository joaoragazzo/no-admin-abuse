import type React from "react";
import { Rating } from "../misc/Rating";
import { GoDotFill } from "react-icons/go";
import { FaAngleDown, FaThumbsUp, FaTrash } from "react-icons/fa";
import { IoIosReturnRight } from "react-icons/io";
import { Tag } from "../misc/Tag";
import type { ReviewDisplayDTO } from "@/interfaces/ReviewDisplayDTO";
import Popup from "reactjs-popup";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";

interface ReviewCardProps {
    content: ReviewDisplayDTO
    editable?: boolean
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ content, editable=false }) => {
    const { handleReviewDelete } = useNetworkHome();
    
    return (
        <div className="flex flex-col gap-3">
            <div className="bg-gray-980 rounded-md">
                <div className="flex flex-row items-center gap-3 mb-2">
                    <img src={content.author.avatarUrl} className="rounded-full w-10 h-10 items-center flex justify-center" />
                    <div className="flex flex-col w-full">    
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-3">
                                <div className="font-bold">{content.author.name}</div>
                                <GoDotFill size={12}/>
                                <div className="text-xs text-gray-300">Há 1 semana</div>
                            </div>
                            {editable &&
                                <Popup 
                                    trigger={
                                        <FaTrash 
                                            className="cursor-pointer transition-all hover:scale-110"
                                            onClick={() => {handleReviewDelete({id: content.id })}}
                                        />
                                    }
                                    on={"hover"}
                                    position={"bottom center"}
                                >
                                    <div className="bg-white px-3 text-xs rounded text-black">
                                        Excluir avaliação
                                    </div>
                                </Popup>
                            }
                        </div>
                        <Rating rating={content.rating} size={14}/>
                    </div>
                </div>

                <div className="text-justify text-sm text-gray-200">
                    {content.text}
                </div>
                
                <div className="mt-3 flex flex-wrap flex-row gap-3">
                    <Tag color="red">Staff parcial</Tag>
                    <Tag color="green">Muitos eventos</Tag>
                </div>

                <div className="text-sm mt-1 items-center flex flex-row gap-3">
                    <div className="flex flex-row gap-1 text-xs items-center">
                        <FaThumbsUp /> 1.234
                    </div>
                    
                    <div className="text-sm text-blue-600 hover:bg-gray-900 px-2 py-1 w-fit rounded-full cursor-pointer">
                        Responder
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-sm flex items-center gap-1.5 text-gray-400">
                        <IoIosReturnRight /> Resposta da equipe de administração
                    </div>

                    <div className="ml-5 flex flex-col gap-2">
                        <div className="flex flex-row gap-3 items-center">
                            <div className="bg-green-700 rounded-full w-10 h-10 items-center flex justify-center">
                                AD
                            </div>
                            <div className="flex flex-col">
                                <div className="font-bold">
                                    Administration Team
                                </div>
                                <div className="text-sm">
                                    Há 3 dias
                                </div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-200">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Totam, nihil! Eveniet quis modi porro adipisci! Autem ipsa 
                            ad quod blanditiis itaque debitis eaque mollitia, qui vero, 
                            neque a veniam delectus?
                        </div>
                    </div> 
                </div>

                <div className="text-sm mt-5 flex items-center gap-1 text-blue-600 w-fit rounded-full cursor-pointer">
                    <FaAngleDown /> 12 respostas
                </div>
            </div>
        </div>
    );
}