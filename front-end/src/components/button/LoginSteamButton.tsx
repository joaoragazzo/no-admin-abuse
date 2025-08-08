import type React from "react";

export const LoginSteamButton: React.FC = () => {
    
    const handleLogin = () => {
        window.location.href="/api/v1/auth/steam";
    }

    return (
        <button onClick={handleLogin} className="cursor-pointer">
            <img src="https://community.akamai.steamstatic.com/public/images/signinthroughsteam/sits_01.png" alt="Logar com Steam"/>
        </button>
    )
}