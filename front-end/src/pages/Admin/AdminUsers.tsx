import type React from "react";
import { PageTitle } from "./PageTitle";
import type { ColumnsType } from "antd/es/table";
import type { UserFullInfoDTO } from "@/types/user/UserFullInfoDTO";
import Table from "antd/es/table";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { Avatar, Tooltip } from "antd";
import { FaEdit, FaEye, FaLock } from "react-icons/fa";

const dataColumns: ColumnsType<UserFullInfoDTO> = [
    {
        dataIndex: "avatarUrl",
        key: "avatarUrl",
        render: (avatarUrl: string) => (
            <Avatar src={avatarUrl} shape="square"/>
        ),
        width: 10
    },
    {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (id: string) => (
        <Tooltip title={id}>
            <span className="!font-mono">
                {
                    id.substring(0, 5)}...{id.substring(31, 36)
                }
            </span> 
        </Tooltip>
        ),
        width: 20
    },
    {
       dataIndex: "username",
       key: "username",
       title: "Nome",
       width: 250
    },
    {
        dataIndex: "roles",
        key: "roles",
        title: "Perfil"
    },
    {
        dataIndex: "lastSeenAt",
        key: "lastSeenAt",
        title: "Última vez visto",
        render: (timestamp: number) => {
            if (!timestamp) return "-";
          
            const date = new Date(timestamp);
            return date.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
        },
        width: 200
    },
    {
        dataIndex: "createdAt",
        key: "createdAt",
        title: "Criado em",
        render: (timestamp: number) => {
            if (!timestamp) return "-";
          
            const date = new Date(timestamp);
            return date.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
        } 
    },
    {
        title: "Ações",
        render: () => (
            <div className="flex flex-row gap-2">
                <Tooltip title="Bloquear conta">
                    <FaLock className="cursor-pointer hover:scale-110 transition-all"/>
                </Tooltip>
                <Tooltip title="Ver logs e ações">
                    <FaEye className="cursor-pointer hover:scale-110 transition-all"/>
                </Tooltip>
                <Tooltip title="Editar">
                    <FaEdit className="cursor-pointer hover:scale-110 transition-all"/>
                </Tooltip>
            </div>
        )
    }
]

export const AdminUsers: React.FC = () => {
    const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<UserFullInfoDTO[]>([]);
    
    useEffect(() => {
        setIsDataLoading(true);

        UserService.getAllUsers().then(res => setUsers(res));

        setIsDataLoading(false);
    },[])

    return <>
        <PageTitle main="Lista de " emphasis="Usuários"/>
        <Table columns={dataColumns} dataSource={users} loading={isDataLoading}/>

    </>
}