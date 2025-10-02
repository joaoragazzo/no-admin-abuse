import type { NetworkDetailsDTO } from "@/types/network/NetworkDetailsDTO";
import type { ReviewCreationDTO } from "@/types/reviews/ReviewCreationDTO";
import type { ReviewDisplayResponseDTO } from "@/types/reviews/ReviewResponseDTO";
import NetworkService from "@/services/NetworkService";
import ReviewService from "@/services/ReviewService";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface NetworkHomeContextType {
    loading: boolean
    networkId: string
    networkDetails: NetworkDetailsDTO | undefined
    reviewsResponse: ReviewDisplayResponseDTO | undefined
    setReviewsResponse: React.Dispatch<React.SetStateAction<ReviewDisplayResponseDTO | undefined>>
    handleReviewPublish: ({data}:{data:ReviewCreationDTO}) => void
    handleReviewDelete: ({id}:{id: string}) => void
    maxPlayersCount: number | 0
    onlinePlayersCount: number | 0
}

const NetworkHomeContext = createContext<NetworkHomeContextType|undefined>(undefined);

export const NetworkHomeProvider = ({ networkId, children } : {networkId: string, children: ReactNode}) => {
    const navigate = useNavigate();
    const [reviewsResponse, setReviewsResponse] = useState<ReviewDisplayResponseDTO | undefined>(undefined);
    const [networkDetails, setNetworkDetails] = useState<NetworkDetailsDTO|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const maxPlayersCount = networkDetails?.servers.reduce((sum,acc) => sum += acc.maxPlayers, 0) ?? 0
    const onlinePlayersCount = networkDetails?.servers.reduce((sum, acc) => sum += acc.onlinePlayers, 0) ?? 0

    const fetchReview = async ({ networkId }:{networkId: string}) => {
        const response = await NetworkService.fetchReviews({ networkId: networkId });
        setReviewsResponse(response)
    }

    const handleReviewDelete = async ({id}:{id: string}) => {
        await ReviewService.deleteReview({ reviewId: id });
        fetchReview({networkId : networkId});
    }

    const handleReviewPublish = async ({ data }:{ data: ReviewCreationDTO }) => {
        await ReviewService.postReview({ networkId: networkId, data: data });
        fetchReview({networkId : networkId});
    }

    useEffect(() => {
            NetworkService.fetchNetworkDetails({id: networkId})
                .then(response => {
                    setNetworkDetails(response);
                    setLoading(false);
                }).catch(_ => navigate("/"));
    
            NetworkService.fetchReviews({ networkId: networkId })
                .then(response => {
                    setReviewsResponse(response);
                });
        }, [])

    const value: NetworkHomeContextType = {
        loading,
        networkId,
        networkDetails,
        reviewsResponse,
        setReviewsResponse,
        handleReviewDelete,
        handleReviewPublish,
        maxPlayersCount,
        onlinePlayersCount
    }

    return (
        <NetworkHomeContext.Provider
            value={value}
        >
            { children }
        </NetworkHomeContext.Provider>
    );
}

export const useNetworkHome = () => {
    const context = useContext(NetworkHomeContext);
    if (!context) throw new Error('useNetworkHome must be used within an NetworkHomeProvider');
    return context;
}