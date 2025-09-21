import { FaCirclePlus } from "react-icons/fa6";
import { PageTitle } from "./PageTitle";
import { Button, Table } from "antd";
import { CreateNetworkTag } from "@/components/popups/CreateNetworkTag";
import { useEffect, useState } from "react";
import type { GameInfoDTO } from "@/types/game/GameInfoDTO";
import type { ColumnsType } from "antd/es/table";
import type { NetworkTagInfoDTO } from "@/types/networkTag/NetworkTagInfoDTO";
import NetworkTagService from "@/services/NetworkTagService";
import { Tag } from "@/components/misc/Tag";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const dataColums: ColumnsType<NetworkTagInfoDTO> = [
    {
        title: "Slug",
        dataIndex: "tagSlug",
        key: "tagSlug",
        render: (slug: string) => <span className="!font-mono border-1 px-4 py-1 rounded-md border-gray-500 leading-none items-center">{slug}</span>
    },
    {
        title: "Status",
        dataIndex: "isPositive",
        key: "isPositive",
        width: 100,
        render: (status: boolean) => status ? <Tag color="green">Positiva</Tag> : <Tag color="red">Negativa</Tag>
    },
    {
        title: "Jogo",
        dataIndex: "game",
        key: "game",
        width: 200,
        render: (game: GameInfoDTO) => (<span className="font-semibold">{game.name}</span>)
    },
    {
        title: "Ações",
        dataIndex: "id",
        key: "id",
        width: 120,
        render: () => (
            <div className="flex flex-row gap-3">
                <FaEdit className="cursor-pointer hover:scale-115" /> 
                <FaEye className="cursor-pointer hover:scale-115" /> 
                <FaTrash className="cursor-pointer hover:scale-115"  />
            </div>
        )
    }
]

export const AdminNetworkTags: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [tableData, setTableData] = useState<NetworkTagInfoDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const updateTable = async () => {
        setIsLoading(true);
        NetworkTagService.getAllNetworkTags().then((res) => {
            setTableData(res);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        updateTable()
    },[])


    return (
        <>
        <div>
            <PageTitle 
                main="Configurações de"
                emphasis="Tags de Redes"
            /> 
    
            <div className="w-full gap-5 flex flex-col">
                <div className="flex flex-col w-full">
                    <div className="relative flex flex-row justify-end items-center py-2 rounded-md w-full">
                        <Button
                            type="primary"
                            icon={<FaCirclePlus/>}
                            onClick={() => {setIsModalOpen(true)}}
                        >
                            Criar nova Tag de Rede
                        </Button>
                    </div>
                </div>
                <Table 
                    columns={dataColums} 
                    dataSource={tableData} 
                    loading={isLoading}
                />
            </div>
            
        </div>
            <CreateNetworkTag 
                open={isModalOpen}
                onClose={() => {setIsModalOpen(false)}}
                updateTable={updateTable}
            />
        </>    
    );
}