import type { ReviewDisplayDTO } from "@/interfaces/ReviewDisplayDTO";
import { createContext, useContext, useState, type ReactNode } from "react";

interface NetworkHomeContextType {
    networkId: string | undefined,
    setNetworkId: (value: string | undefined) => void,

    reviews: ReviewDisplayDTO[],
    setReviews: React.Dispatch<React.SetStateAction<ReviewDisplayDTO[]>>
}

const NetworkHomeContext = createContext<NetworkHomeContextType|undefined>(undefined);

export const NetworkHomeProvider = ({ children } : {children: ReactNode}) => {
    const [networkId, setNetworkId] = useState<string|undefined>(undefined);
    const [reviews, setReviews] = useState<ReviewDisplayDTO[]>([]);


    const value: NetworkHomeContextType = {
        networkId,
        setNetworkId,

        reviews,
        setReviews,
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