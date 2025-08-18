import type { ReviewDisplayResponseDTO } from "@/interfaces/ReviewResponseDTO";
import { createContext, useContext, useState, type ReactNode } from "react";

interface NetworkHomeContextType {
    networkId: string | undefined,
    setNetworkId: (value: string | undefined) => void,

    reviewsResponse: ReviewDisplayResponseDTO | undefined,
    setReviewsResponse: React.Dispatch<React.SetStateAction<ReviewDisplayResponseDTO | undefined>>
}

const NetworkHomeContext = createContext<NetworkHomeContextType|undefined>(undefined);

export const NetworkHomeProvider = ({ children } : {children: ReactNode}) => {
    const [networkId, setNetworkId] = useState<string|undefined>(undefined);
    const [reviewsResponse, setReviewsResponse] = useState<ReviewDisplayResponseDTO | undefined>(undefined);


    const value: NetworkHomeContextType = {
        networkId,
        setNetworkId,

        reviewsResponse,
        setReviewsResponse,
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