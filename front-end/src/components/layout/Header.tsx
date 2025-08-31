import { FaBars, FaCrown, FaGamepad } from "react-icons/fa"
import { LoginSteamButton } from "../button/LoginSteamButton"
import { FaShield } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react";
import { Brand } from "../Brand";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Popup from "reactjs-popup";
import { LoginPopup } from "./LoginPopup";
import { SafeLoginPopup } from "../popups/SafeLoginPopup";


export const Header: React.FC = () => {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [safeLoginPopup, setSafeLoginPopup] = useState<boolean>(false);
    const { user, isAuthenticated } = useAuth();
    
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (
            menuOpen &&
            dropdownRef.current &&
            hamburgerRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            !hamburgerRef.current.contains(event.target as Node)
          ) {
            setMenuOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [menuOpen]);


    const items = [
        {
            content:
            <>
                {isAuthenticated &&
                    <Link
                        to="/admin"
                        onClick={() => {setMenuOpen(false)}}
                        className="flex flex-row gap-3 items-center"
                    >
                        <FaCrown /> Administrador
                    </Link>
                }
            </>,
            link: "/admin"
            
        },
        {
            content: 
                <Link 
                    to="/games" 
                    onClick={() => {setMenuOpen(false)}} 
                    className="flex flex-row items-center gap-3"
                >
                    <FaGamepad />Jogos
                </Link>,
            link: "/games"
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
            </>,
            link: "/games"
        },
        
    ]

    const handleMenuClick = (path: string) => {
        setMenuOpen(false);
        navigate(path);
    }
    
    return (
    <>
        <header className="items-center flex justify-between w-full bg-neutral-950 border-neutral-700 border-b p-5 px-10">
            <Brand />
            <div className="hidden lg:flex items-center font-semibold font-1x1 flex-row gap-8">
                {items.map((content, key) => (
                    <div key={key} className="flex flex-row items-center gap-3 hover:text-blue-400 cursor-pointer">
                        {content.content}
                    </div>
                ))}
            </div>
            <div 
                ref={hamburgerRef}
                className="lg:hidden flex cursor-pointer" 
                onClick={() => {setMenuOpen(!menuOpen)}}
            >
                <FaBars size={24}/>
            </div>
        </header>

        <div
            ref={dropdownRef} 
            className={`${menuOpen ? 'flex' : 'hidden'} mt-18 lg:hidden flex-col absolute w-full bg-blue-980`}
        >
            {items.map((content, key) => (
                <div
                    onClick={() => {handleMenuClick(content.link)}}
                    key={key} 
                    className="flex flex-row items-center gap-3 w-full border-b-1 border-white/10 py-4 px-10 hover:bg-blue-950/50 hover:text-blue-400 cursor-pointer"
                >
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