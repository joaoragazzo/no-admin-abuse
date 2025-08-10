import { useAuth } from "@/contexts/AuthContext";
import type React from "react";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImExit } from "react-icons/im";

export const LoginPopup: React.FC = () => {
    const { user, logout } = useAuth();
    
    return (  
        <div className="text-sm flex flex-col bg-white rounded-md text-black">
            <div className="w-full p-3 justify-center flex flex-col items-center">
                <div className="w-18 mb-2">
                    <img src={user?.avatarUrl} className="rounded-md"/>
                </div>
                <div className="font-bold">
                    Olá, {user?.username} !
                </div>
            </div>
            
            <div className="rounded-t-md cursor-pointer hover:bg-gray-100 px-3 py-1 flex flex-row gap-2.5 items-center">
                <FaUser /> Perfil
            </div>
            <div className="cursor-pointer hover:bg-gray-100 px-3 flex flex-row py-1 gap-2.5 items-center">
                <FaGear /> Configurações
            </div>
            <div onClick={() => {logout()}} className="rounded-b-md cursor-pointer hover:bg-gray-100 px-3 py-1 flex flex-row gap-2.5 items-center">
                <ImExit /> Logout
            </div>
        </div>
    );
}