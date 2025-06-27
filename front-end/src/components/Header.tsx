import { FaBars, FaServer } from "react-icons/fa"
import { LoginSteamButton } from "./button/LoginSteamButton"
import { FaFileShield, FaFileSignature, FaShield } from "react-icons/fa6"
import { useState } from "react";


export const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    
    const items = [
        {
            content: <><FaServer />Servidores</>
        },
        {
            content: <><FaFileShield />Termos de Uso</>
        },
        {
            content: <><FaFileSignature /> Nosso Manifesto</>
        },
        {
            content: <LoginSteamButton />
        }
    ]
    
    return (
    <>
        <header className="items-center text-white flex justify-between w-full border-gray-700 border-b p-5 px-10">
            <div className="text-2xl font-extrabold flex flex-row items-center">
                <FaShield className="mr-4"/> No Admin Abuse
            </div>
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
        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:hidden flex-col absolute w-full bg-blue-950/30 text-white`}>
            {items.map((content, key) => (
                <div key={key} className="flex flex-row items-center gap-3 w-full border-b-1 border-gray-950/30 py-4 px-10 hover:bg-blue-950/50 hover:text-blue-400 cursor-pointer">
                    {content.content}
                </div>
            ))}
            <div>
            </div>
        </div>
    </>
        
    )
}