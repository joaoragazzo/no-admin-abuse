import { FaBars, FaGamepad, FaUser } from "react-icons/fa"
import { LoginSteamButton } from "../button/LoginSteamButton"
import { FaFileShield, FaFileSignature, FaGear } from "react-icons/fa6"
import { useState } from "react";
import { Brand } from "../Brand";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Popup from "reactjs-popup";
import { ImExit } from "react-icons/im";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const { logout, user, isAuthenticated } = useAuth();
    
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
            content: 
            <>
            {isAuthenticated ? 
                <Popup
                    trigger={<img src={user?.avatarUrl} width={40} className="rounded-md" />}
                    position={"bottom right"}
                >
                    <div className="text-sm flex flex-col bg-white rounded-md text-black">
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
                </Popup> : 
                <LoginSteamButton/>
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