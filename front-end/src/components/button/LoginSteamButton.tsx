import type React from "react";
import { FaSteam } from "react-icons/fa";

export const LoginSteamButton: React.FC = () => {
    
    const handleLogin = () => {
        window.location.href="/api/v1/auth/steam";
    }

    return (
        <button
        onClick={handleLogin}
        className="
            cursor-pointer 
            flex flex-row items-center justify-center gap-2 
            px-4 py-2
            rounded-lg 
            border border-neutral-700
            text-gray-300 
            font-medium
            transition 
            hover:border-neutral-500
            hover:text-white
            active:scale-95
        "
        >
            <FaSteam className="text-lg group-hover:text-white" />
            Entre com a Steam
        </button>
    )
}