import { ReviewCard } from "@/components/cards/ReviewCard";
import { Pagination } from "@/components/table/Pagination";
import { Card } from "@/components/template/Card";
import type React from "react";
import { FaFilter } from "react-icons/fa";
import { ImBubbles } from "react-icons/im";
import { NetworkMakeReview } from "./NetworkMakeReview";
import { useNetworkHome } from "@/contexts/NetworkHomeContext";

export const NetworkReviews: React.FC = () => {
    const { reviews } = useNetworkHome();
    
    return (
        <>
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

            <NetworkMakeReview />

            {reviews.map((content, index) => (
                <ReviewCard content={content} key={index}/>
            ))}

            <Pagination currentPage={1} totalPages={10} onPageChange={() => {}}/>
        </>
    )
}