import type React from "react";
import { Rating } from "../misc/Rating";
import { GoDotFill } from "react-icons/go";
import { FaAngleDown, FaThumbsUp, FaTrash, FaUserSecret } from "react-icons/fa";
import { IoIosReturnRight } from "react-icons/io";
import { Tag } from "../misc/Tag";
import type { ReviewDisplayDTO } from "@/interfaces/reviews/ReviewDisplayDTO";
import Popup from "reactjs-popup";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { useState } from "react";

interface ReviewCardProps {
    content: ReviewDisplayDTO
    editable?: boolean
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ content, editable=false }) => {
    dayjs.locale('pt-br');
    dayjs.extend(relativeTime);

    const { handleReviewDelete } = useNetworkHome();
    const [showMore, setShowMore] = useState<boolean>(false);
    
    const getRelativeDatenow = () => {
        const text = dayjs(new Date(content.createdAt)).fromNow(); 
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    const handleWithDescription = () => {
        if (content.text.length > 600 && !showMore)
            return (
            <>{content.text.slice(0, 400)}... 
                <span 
                    className="text-blue-500 hover:text-blue-600 cursor-pointer hover:decoration-1 hover:underline"
                    onClick={() => {setShowMore(true)}}
                >
                    {" "}Ler mais
                </span>
            </>
            )
        
        return content.text;
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-gray-980 rounded-md">
                <div className="flex flex-row items-center gap-3 mb-2">
                    {content.author && !content.isAnonymous && 
                        <img src={content.author?.avatarUrl} className="rounded-full w-10 h-10 items-center flex justify-center" />
                    }
                    {content.isAnonymous && !content.author &&
                        <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 shadow-md">
                            <FaUserSecret className="text-white text-xl" />
                        </div>
                    }
                    {content.author && content.isAnonymous && (
                        <div className="flex">
                            <img src={content.author?.avatarUrl} className="rounded-full w-10 h-10 items-center flex justify-center" />
                            <div className="absolute rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-600 to-gray-400 shadow-md" 
                                style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}>
                            <FaUserSecret className="text-white text-xl" />
                            </div>
                        </div>
                    )}
                    <div className="flex flex-col w-full">    
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-1.5">
                                <div className="font-bold">{
                                    content.author?.name || 
                                    "Usuário Anônimo"
                                }</div>
                                {content.author?.name && content.isAnonymous && 
                                <div className="text-xs text-gray-200">
                                    (Esta avaliação está anônima)
                                </div>
                                }
                                <GoDotFill size={12}/>
                                <div className="text-xs text-gray-300">{getRelativeDatenow()}</div>
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

                <div className="text-justify text-sm text-gray-200 break-words">
                    {handleWithDescription()}
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