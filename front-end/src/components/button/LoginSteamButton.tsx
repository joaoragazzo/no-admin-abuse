import type React from "react";

export const LoginSteamButton: React.FC = () => {
    const handleLogin = () => {
        alert("Not yet implemented");
    }

    return (
        <button onClick={handleLogin} className="cursor-pointer">
            <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_large_noborder.png" alt="Logar com Steam"/>
        </button>
    )
}