import { FaFlag, FaLanguage, FaList, FaTag } from "react-icons/fa"
import { AdminSectionButton } from "../button/AdminSectionButton"
import { FaPerson, FaShield } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

export const AdminMenu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="grid grid-cols-3 gap-10">
            <AdminSectionButton 
                title="Tags"
                Icon={FaTag}
                description="Configurações de Tags"
                details="Crie tags que poderão ser utilizadas nos para classificar diferentes servidores"
                onClick={() => {navigate("/admin/tags")}}
            />

            <AdminSectionButton 
                title="Redes"
                Icon={FaList}
                description="Configurações de Redes"
                details="Veja a lista de redes ativas e execute operações"
            />

            <AdminSectionButton 
                title="Segurança"
                Icon={FaShield}
                description="Logs e Registros"
                details="Atividades suspeita, banimento de IPs, logs de ocorrências"
            />

            <AdminSectionButton 
                title="Usuários"
                Icon={FaPerson}
                description="Lista de Jogadores"
                details="Veja a lista de usuários e execute ações"
            />

            <AdminSectionButton 
                title="Denúncias"
                Icon={FaFlag}
                description="Avaliar denúncias"
                details="Dê o veredito para denúncias de conteúdo impróprio"
            />

            <AdminSectionButton 
                title="Traduções"
                Icon={FaLanguage}
                description="Adaptar traduções"
                details="Adapte traduções para outros idiomas"
                onClick={() => {navigate("/admin/i18n")}}
            />


        </div>
    )
}