import { FaBars, FaGamepad } from "react-icons/fa"
import { LoginSteamButton } from "../button/LoginSteamButton"
import { FaFileShield, FaFileSignature } from "react-icons/fa6"
import { useState } from "react";
import { Brand } from "../Brand";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { user, isAuthenticated } = useAuth();
    
    const items = [
        {
            content: <Link to="/games" className="flex flex-row items-center gap-3"><FaGamepad />Jogos</Link> 
        },
        {
            content: <><FaFileShield />Termos de Uso</>
        },
        {
            content: <><FaFileSignature /> Nosso Manifesto</>
        },
        {
            content: <>{isAuthenticated ? <img src={user?.avatarUrl} width={40} className="rounded-md"></img> : <LoginSteamButton />}</>
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

        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:hidden flex-col absolute w-full bg-blue-980`}>
            {items.map((content, key) => (
                <div key={key} className="flex flex-row items-center gap-3 w-full border-b-1 border-gray-950/30 py-4 px-10 hover:bg-blue-950/50 hover:text-blue-400 cursor-pointer">
                    {content.content}
                </div>
            ))}
        </div>
    </>
        
    )
}