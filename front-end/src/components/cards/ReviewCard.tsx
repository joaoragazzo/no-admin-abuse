import type React from "react";
import { Rating } from "../misc/Rating";
import { GoDotFill } from "react-icons/go";
import { FaAngleDown, FaThumbsUp } from "react-icons/fa";
import { IoIosReturnRight } from "react-icons/io";
import { Tag } from "../misc/Tag";

export const ReviewCard: React.FC = () => {
    return (
        <div className="mt-3 flex flex-col gap-3">
            <div className="bg-gray-980 rounded-md py-5">
                <div className="flex flex-row items-center gap-3 mb-2">
                    <div className="bg-green-700 rounded-full w-10 h-10 items-center flex justify-center">
                        VP
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center w-full gap-3">
                            <div className="font-bold">Lorem Ipsum</div>
                            <GoDotFill size={12}/>
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