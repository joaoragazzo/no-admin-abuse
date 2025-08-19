import { ReviewCard } from "@/components/cards/ReviewCard";
import { Pagination } from "@/components/table/Pagination";
import { Card } from "@/components/template/Card";
import type React from "react";
import { FaAngleRight, FaFilter } from "react-icons/fa";
import { ImBubbles } from "react-icons/im";
import { NetworkMakeReview } from "./NetworkMakeReview";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";

export const NetworkReviews: React.FC = () => {
    const { reviewsResponse } = useNetworkHome();
    
    
    return (
        <>
            <Card.Title>
                <div className="flex flex-row justify-between w-full items-center mb-3">
                    <div className="flex flex-row items-center gap-3 font-bold text-md">
                        <ImBubbles className="text-blue-700"/> Avaliações
                    </div>
                    <button className="text-xs font-bold px-7 items-center flex flex-row gap-2 text-gray-100 border-1 border-gray-400 py-1.5 rounded-md cursor-pointer">
                        <FaFilter /> Ordenar por
                    </button>
                </div>
            </Card.Title>

            {
                reviewsResponse?.ownReview ?
                <div>
                    <div className="mb-3 font-bold flex items-center gap-2">
                        Sua avaliação <FaAngleRight />
                    </div>
                    <ReviewCard content={reviewsResponse.ownReview} editable/>
                </div>
                :
                <NetworkMakeReview />
            
            }
            
            <div className="flex items-center my-6">
                <div className="w-3 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-300 text-md">Avaliações de outros jogadores</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {reviewsResponse?.reviews.content.map((content, index) => (
                <ReviewCard content={content} key={index}/>
            ))}

            <div className="mt-5">
                <Pagination currentPage={1} totalPages={10} onPageChange={() => {}}/>
            </div>
        </>
    )
}