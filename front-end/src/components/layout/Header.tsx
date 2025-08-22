import { FaBars, FaGamepad } from "react-icons/fa"
import { LoginSteamButton } from "../button/LoginSteamButton"
import { FaShield } from "react-icons/fa6"
import { useState } from "react";
import { Brand } from "../Brand";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Popup from "reactjs-popup";
import { LoginPopup } from "./LoginPopup";
import { SafeLoginPopup } from "../popups/SafeLoginPopup";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [safeLoginPopup, setSafeLoginPopup] = useState<boolean>(false);
    const { user, isAuthenticated } = useAuth();
    

    const items = [
        {
            content: <Link to="/games" onClick={() => {setMenuOpen(false)}} className="flex flex-row items-center gap-3"><FaGamepad />Jogos</Link> 
        },
        {
            content: 
            <>
            {isAuthenticated ? 
                <Popup
                    trigger={<img src={user?.avatarUrl} width={40} className="rounded-md" />}
                    position={"bottom right"}
                >
                    <LoginPopup />
                </Popup> : 
                <div className="flex gap-3 items-center">
                    <LoginSteamButton />
                    <FaShield onClick={() => {setSafeLoginPopup(true)}} className="text-black hover:bg-white bg-gray-100 hover:scale-115 transition-all w-6 h-6 p-1.5 rounded-md"/>
                </div>
            }
            </>
        }
    ]
    
    return (
    <>
        <header className="items-center flex justify-between w-full bg-gray-950 border-gray-700 border-b p-5 px-10">
            <Brand />
            <div className="hidden lg:flex items-center font-semibold font-1x1 flex-row gap-8">
                {items.map((content, key) => (
                    <div key={key} className="flex flex-row items-center gap-3 hover:text-blue-400 cursor-pointer">
                        {content.content}
                    </div>
                ))}
            </div>
            <div className="lg:hidden flex cursor-pointer" onClick={() => {setMenuOpen(!menuOpen)}}>
                <FaBars size={24}/>
            </div>
        </header>

        <div className={`${menuOpen ? 'flex' : 'hidden'} mt-18 lg:hidden flex-col absolute w-full bg-blue-980`}>
            {items.map((content, key) => (
                <div key={key} className="flex flex-row items-center gap-3 w-full border-b-1 border-white/10 py-4 px-10 hover:bg-blue-950/50 hover:text-blue-400 cursor-pointer">
                    {content.content}
                </div>
            ))}
        </div>
    
        <SafeLoginPopup 
            open={safeLoginPopup}
            onClose={() => {setSafeLoginPopup(false)}}
        />
    </>
        
    )
}