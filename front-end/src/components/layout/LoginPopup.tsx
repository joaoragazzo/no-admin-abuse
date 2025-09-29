import { useAuth } from "@/contexts/AuthContext";
import type React from "react";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

export const LoginPopup: React.FC = () => {
    const { user, logout } = useAuth();
    
    return (  
        <div className="text-sm flex flex-col border border-white/20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl rounded-tr-sm w-40 sm:w-52 shadow-2xl overflow-hidden">
            <div className="w-full p-4 flex flex-row items-center gap-3 justify-center bg-neutral-800/60 border-b border-white/10">
            <div className="w-12 h-12 shadow-md rounded-lg overflow-hidden bg-neutral-700 flex items-center justify-center">
                {user?.avatarUrl ? (
                    <img src={user.avatarUrl} className="w-full h-full object-cover" />
                ) : (
                    <FaUser className="text-neutral-400 text-2xl" />
                )}
            </div>
                <div className="font-bold text-lg text-white truncate">
                    {user?.username}
                </div>
            </div>
            
            <button className="transition-all duration-150 rounded-none cursor-pointer hover:bg-neutral-700/80 px-4 py-2 flex flex-row gap-2.5 items-center text-white/90 font-medium border-b border-white/10">
                <FaUser className="text-neutral-400" /> Perfil
            </button>
            <button className="transition-all duration-150 rounded-none cursor-pointer hover:bg-neutral-700/80 px-4 py-2 flex flex-row gap-2.5 items-center text-white/90 font-medium border-b border-white/10">
                <FaGear className="text-neutral-400" /> Configurações
            </button>
            <button
                onClick={() => logout()}
                className="transition-all duration-150 rounded-b-2xl cursor-pointer hover:bg-red-700/80 px-4 py-2 flex flex-row gap-2.5 items-center text-red-400 font-semibold"
            >
                <ImExit /> Logout
            </button>
        </div>
    );
}