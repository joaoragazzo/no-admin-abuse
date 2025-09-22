import { 
    FaAngleRight, 
    FaChartBar, 
    FaGavel, 
    FaHome, 
    FaLanguage, 
    FaLock, 
    FaServer, 
    FaSitemap, 
    FaSpider, 
    FaTag, 
    FaUsers 
} from "react-icons/fa"
import { FaMessage, FaShield } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import type React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { Layout, Menu, Avatar, Typography } from "antd"
import type { MenuProps } from "antd"

const { Sider } = Layout
const { Text } = Typography

const items: MenuProps['items'] = [
    {
        key: '/admin',
        icon: <FaHome />,
        label: 'Home',
    },
    {
        key: '/admin/users',
        icon: <FaUsers />,
        label: 'Usuários',
    },
    {
        key: '/admin/reviews',
        icon: <FaMessage />,
        label: 'Reviews',
    },
    {
        key: '/admin/tags',
        icon: <FaTag />,
        label: 'Tags',
    },
    {
        key: '/admin/reports',
        icon: <FaGavel />,
        label: 'Denúncias',
    },
    {
        key: '/admin/security',
        icon: <FaLock />,
        label: 'Segurança',
    },
    {
        key: '/admin/statistics',
        icon: <FaChartBar />,
        label: 'Estatísticas',
    },
    {
        key: '/admin/servers',
        icon: <FaServer />,
        label: 'Servidores',
    },
    {
        key: '/admin/networks',
        icon: <FaSitemap />,
        label: 'Redes',
    },
    {
        key: '/admin/translations',
        icon: <FaLanguage />,
        label: 'Traduções',
    },
    {
        key: '/admin/scrapping',
        icon: <FaSpider />,
        label: 'Scrapping',
    },
]

export const AdminMenu: React.FC = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [collapsed, setCollapsed] = useState(true)
    const [selectedKey, setSelectedKey] = useState('/admin')

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        navigate(key)
        setSelectedKey(key)
    }

    const handleLogoClick = () => {
        navigate('/')
    }

    const handleLogout = () => {
        console.log('Logout')
    }

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={180}
            className="h-screen"
        >
            <div className="h-full flex flex-col">
                
                <div 
                    className="flex flex-row items-center p-4 cursor-pointer text-center border-b border-gray-600"
                    onClick={handleLogoClick}
                >
                    <FaShield className="text-2xl text-white mx-auto" />
                    {!collapsed && 
                        <Text className="text-white font-bold text-xl leading-4">
                            No Admin Abuse
                        </Text>
                    }
                </div>

                <div className="flex-1">
                    <Menu
                        defaultSelectedKeys={[selectedKey]}
                        selectedKeys={[selectedKey]}
                        mode="inline"
                        items={items}
                        onClick={handleMenuClick}
                        className="h-full border-r-0"
                    />
                </div>

                <div className="p-4 border-t border-gray-600">
                    <div className="flex items-center gap-3">
                        <Avatar 
                            src={user?.avatarUrl} 
                            size={40}
                            className="flex-shrink-0"
                        />
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <div className="text-white font-semibold text-sm truncate">
                                    {user?.username}
                                </div>
                                <div 
                                    className="text-gray-300 text-xs cursor-pointer hover:text-white flex items-center gap-1 mt-1"
                                    onClick={handleLogout}
                                >
                                    Deslogar <FaAngleRight />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </Sider>
    )
}