import { NetworkHomeProvider } from "@/contexts/NetworkHomeContext"
import type React from "react"
import { NetworkHome } from "./NetworkHome"
import { useNavigate, useParams } from "react-router-dom";

export const NetworkHomeWrapper: React.FC = () => {
    const navigate = useNavigate();
    const { networkId } = useParams<{ networkId: string }>(); 
    
    if (!networkId) {
        navigate("/"); 
        return;
    };

    return (
        <NetworkHomeProvider networkId={networkId}>
            <NetworkHome />
        </NetworkHomeProvider>
    )
}