import { ReviewCard } from "@/components/cards/ReviewCard";
import { Card } from "@/components/template/Card";
import type React from "react";
import { FaAngleRight, FaFilter } from "react-icons/fa";
import { ImBubbles } from "react-icons/im";
import { NetworkMakeReview } from "./NetworkMakeReview";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";
import { useAuth } from "@/contexts/AuthContext";
import { LOGIN_PATH } from "@/constants/paths";
import { Button } from "antd";

export const NetworkReviews: React.FC = () => {
    const { reviewsResponse } = useNetworkHome();
    const { isAuthenticated } = useAuth();

    return (
        <>
            <Card.Title>
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="flex flex-row items-center gap-3 font-bold text-md">
                        <div className="flex items-center p-2 rounded-md bg-blue-600 ishadow-l">
                            <ImBubbles className="text-sm"/>
                        </div>
                         Avaliações
                    </div>
                    <Button className="bg-neutral-950 px-5 py-4 text-[14px]">
                        <FaFilter /> Ordenar por
                    </Button>
                </div>
            </Card.Title>

            {
            reviewsResponse?.ownReview ?
                <div>
                    <div className="font-bold flex items-center gap-2">
                        Sua avaliação <FaAngleRight />
                    </div>
                    <ReviewCard content={reviewsResponse.ownReview} editable/>
                </div>
                : (
                    isAuthenticated ? 
                        <NetworkMakeReview /> 
                    : 
                    <div className="p-4 rounded-md bg-gray-800/60 text-center text-gray-200 text-sm shadow-md">
                        <a 
                            className="font-medium text-white underline cursor-pointer decoration-1 hover:text-blue-500"
                            href={LOGIN_PATH}    
                        >
                            Faça login
                        </a>{" "}
                            para deixar sua avaliação.
                    </div>
                )
            }
                
            {
            (reviewsResponse?.reviews.content.length ?? 0) > 0 &&
                <div className="flex items-center my-6">
                    <div className="w-3 border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-300 text-md">Avaliações de outros jogadores</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div> 
            }
                
            {reviewsResponse?.reviews.content.map((content, index) => (
                <ReviewCard content={content} key={index}/>
            ))}
        </>
    )
}