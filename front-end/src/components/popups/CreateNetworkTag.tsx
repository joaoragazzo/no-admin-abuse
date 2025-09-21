import type React from "react";
import { PopupSkeleton } from "./PopupSkeleton";
import { Input } from "../inputs/Input";
import { Select } from "../inputs/Select";
import { useEffect, useState } from "react";
import type { Option } from "@/types/Option";
import GameService from "@/services/GameService";
import { Button } from "antd";
import { FaPlusCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NetworkTagService from "@/services/NetworkTagService";

interface CreateNetworkTagProps {
    open: boolean
    onClose: () => void;
    updateTable: () => void
}

export const CreateNetworkTag: React.FC<CreateNetworkTagProps> = ({open, onClose, updateTable}) => {
    const [tagSlug, setTagSlug] = useState<string>("");
    const [isPositive, setIsPositive] = useState<boolean|null>();
    const [gameId, setGameId] = useState<string|null>("")
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [gameOptions, setGameOptions] = useState<Option[]>([]);

    useEffect(() => {
        GameService.fetchAllGamesOption().then((res) => setGameOptions(res));
    },[])

    useEffect(() => {
        setGameId(null);
        setIsPositive(null);
        setTagSlug("");
    },[open])

    return (<PopupSkeleton
        open={open}
        onClose={onClose}
        title={"Criar uma nova tag de rede"}
        closeDocumentOnClick={false}
    >
        <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full gap-3">
                <Select
                    className="basis-1/3"
                    label="Jogo"
                    required
                    options={gameOptions}

                    onChange={setGameId}
                    value={gameId}
                />

                <Select 
                    className="basis-1/3"
                    label="Característica"
                    placeholder="Positiva ou negativa?"
                    options={[
                        {value: false, label: "Negativa"},
                        {value: true, label: "Positiva"}
                    ]}
                    required

                    onChange={setIsPositive}
                    value={isPositive}
                />

                <Input 
                    className="basis-1/3"
                    label="Slug da Tag"
                    placeholder="Referência para a tag"
                    required
                    onChange={(e) => {setTagSlug(e)}}
                    value={tagSlug}
                />
            </div>

            <div className="justify-end w-full flex gap-3">
                <Button 
                    type="primary"
                    icon={isLoading ? <AiOutlineLoading3Quarters className="animate-spin"/> : <FaPlusCircle /> }
                    onClick={() => {
                        if (!tagSlug || !gameId || typeof(isPositive) !== "boolean")
                            return;
                        setIsLoading(true);

                        NetworkTagService.createNewNetworkTag({
                            slug: tagSlug,
                            gameId: gameId,
                            isPositive: isPositive
                        }).then(updateTable);
                        
                        setIsLoading(false);
                        onClose();
                    }}
                    disabled={isLoading}
                    
                > 
                    {isLoading ? <>Criando...</>: <>Criar Nova Tag</>}
                </Button>
                <Button
                    onClick={onClose}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    </PopupSkeleton>)
}