import { FaCirclePlus } from "react-icons/fa6";
import { PageTitle } from "./PageTitle";
import { Button } from "antd";
import { CreateNetworkTag } from "@/components/popups/CreateNetworkTag";
import { useState } from "react";

export const AdminNetworkTags: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    return (
        <>
        <div>
            <PageTitle 
                main="Configurações de"
                emphasis="Tags de Redes"
            /> 

            <div className="flex flex-row gap-5"> 
                <div className="w-full">
                <div className="flex flex-col gap-0.5 w-full">
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
                    
                </div>
            </div>
        </div>
        <CreateNetworkTag 
            open={isModalOpen}
            onClose={() => {setIsModalOpen(false)}}
        />
        </>
        
    );
}