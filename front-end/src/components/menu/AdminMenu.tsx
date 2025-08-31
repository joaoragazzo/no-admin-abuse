import { FaAngleLeft, FaAngleRight, FaChartBar, FaGavel, 
    FaHome, FaLanguage, FaLock, FaServer, 
    FaSitemap, FaTag, FaUsers } from "react-icons/fa"
import { FaMessage, FaShield } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import type { IconType } from "react-icons/lib"
import type React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import clsx from "clsx"

interface SidebarItemProps {
    title: string
    Icon: IconType
    onClick: () => void
    selected: boolean
    expanded: boolean
}

const items = [
    { title: "Home", Icon: FaHome, path: "/admin", selected:false },
    { title: "Usuários", Icon: FaUsers, path: "/admin/users", selected:false },
    { title: "Reviews", Icon: FaMessage, path: "/admin/reviews", selected:false },
    { title: "Tags", Icon: FaTag, path: "/admin/tags", selected:false },
    { title: "Denúncias", Icon: FaGavel, path: "/admin/reports", selected:false },
    { title: "Segurança", Icon: FaLock, path: "/admin/security", selected:false },
    { title: "Estatísticas", Icon: FaChartBar, path: "/admin/statistics", selected:false },
    { title: "Servidores", Icon: FaServer, path: "/admin/servers", selected:false },
    { title: "Redes", Icon: FaSitemap, path: "/admin/networks", selected:false },
    { title: "Traduções", Icon: FaLanguage, path: "/admin/translations", selected:false },
]

const SidebarItem: React.FC<SidebarItemProps> = ({ title, Icon, onClick, selected, expanded }) => {    
    return (
        <div 
            className={clsx(
                "w-full h-full py-3 px-5 cursor-pointer border-b-1 border-neutral-600",
                { "hover:bg-neutral-900": !selected },
                { "bg-neutral-800/80": selected },
                { "justify-center flex" : !expanded }
            )}
            onClick={onClick}
        >
            <div className="flex flex-row items-center gap-8 cursor-pointer ">
                <Icon className="text-xl"/>
                {expanded && <span className="font-semibold text-sm">{title}</span>}
            </div>
        </div>
    )
}

export const AdminMenu: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<string>("/admin");

    return (
    <div className="flex flex-col border-r-1 border-neutral-600">
        <div className="relative">
            <div 
                className={clsx(
                    "cursor-pointer p-5 flex text-nowrap font-extrabold text-2xl border-b-1 border-neutral-600",
                    {"justify-center" : !expanded}
                )}
                onClick={() => {navigate("/")}}
            >
                {expanded ? <div className="leading-none">No Admin Abuse</div> : <FaShield/>}
            </div>
            <div
                className="absolute bottom-4 -right-4 bg-neutral-950 rounded-full border-1 px-2 py-2 border-neutral-600 cursor-pointer"
                onClick={() => {setExpanded(!expanded)}}
            >
                {expanded ? <FaAngleLeft /> : <FaAngleRight />}
            </div>
        </div>
        
        <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col overflow-scroll">
                {items.map((content) => (
                    <SidebarItem 
                        title={content.title} 
                        Icon={content.Icon} 
                        onClick={() => {navigate(content.path); setCurrentPath(content.path)}} 
                        selected={currentPath == content.path}
                        expanded={expanded}
                    />
                ))}
            </div>

            <div className="flex flex-col">
                <div className="px-3 py-5 flex flex-row mt-1 border-neutral-600 border-t-1 gap-3">
                    <img src={user?.avatarUrl} className="rounded-full w-10"/> 
                        {expanded && 
                            <div className="flex flex-col justify-between">
                                <div className="leading-none font-bold">
                                {user?.username}
                                </div>
                                <div className="leading-none text-sm font-semibold items-center flex cursor-pointer">
                                    Deslogar <FaAngleRight />
                                </div>
                            </div>
                        }
                </div>
            </div>
            
        </div>        
    </div>
    )
}