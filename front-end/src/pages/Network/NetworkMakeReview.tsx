import { Switch } from "@/components/inputs/Switch"
import { TextArea } from "@/components/inputs/TextArea"
import { Rating } from "@/components/misc/Rating"
import { Tag } from "@/components/misc/Tag"
import { useNetworkHome } from "@/contexts/NetworkHomeContext"
import { backendI18N } from "@/i18n"
import NetworkTagService from "@/services/NetworkTagService"
import type { NetworkTagDTO } from "@/types/networkTag/NetworkTag"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import { useParams } from "react-router-dom"

export const NetworkMakeReview = () => {
    const { game } = useParams<{ game: string }>();
    const { handleReviewPublish } = useNetworkHome();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [starCounter, setStarCounter] = useState<number>(0);
    const [anonymous, setAnonymous] = useState<boolean>(false);
    const [starError, setStarError] = useState<boolean>(false);
    const [availableTag, setAvailableTags] = useState<NetworkTagDTO[]>([]);
    const [text, setText] = useState<string>("");
    const { t } = useTranslation("network_tag", { i18n: backendI18N })

    const toogleTag = (id: string):void => {
        if (selectedTags.includes(id)) {
            setSelectedTags(prev => prev.filter(prev => prev != id));
        } else {
            setSelectedTags(prev => [...prev, id]);
        }
    }

    const handleSubmit = () => {
        if (starCounter == 0) {
            setStarError(true);
            return;
        }

        handleReviewPublish({data: {
            text: text,
            rating: starCounter,
            anonymous: anonymous,
            tags: selectedTags
        }})
    }

    useEffect(() => {
        if (!game)
            return;

        NetworkTagService
            .getBasicInfoNetworkTag(game)
            .then(res => setAvailableTags(res));
    },[]);


    return (
        <div className="flex flex-col gap-2 mt-3 w-full">             
            <div className="flex flex-row gap-3 text-gray-200">
                Nota: <Rating rating={starCounter} editable onChange={setStarCounter} />
                {starError && 
                <div className="text-xs text-red-700">
                    * Você precisa escolher uma nota de 1 a 5 estrelas.
                </div>}
            </div>

            <div className="mb-2">
                <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                    <FaCheck /> Características positivas
                </div>

                <div className="flex flex-row flex-wrap gap-3">
                    {availableTag.filter(content => content.isPositive).map((content, _) => (
                        <Tag color={selectedTags.includes(content.id) ? "green" : "gray"} onClick={toogleTag} id={content.id}>
                            {t(game + "." + content.slug)}
                        </Tag>
                    ))}
                </div>
                    
                <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center mt-2">
                    <FaX/> Características negativas
                </div>
                
                <div className="flex flex-row flex-wrap gap-3">
                    {availableTag.filter(content => !content.isPositive).map((content, _) => (
                        <Tag color={selectedTags.includes(content.id) ? "red" : "gray"} onClick={toogleTag} id={content.id}>
                            {t(game + "." + content.slug)}
                        </Tag>
                    ))}
                </div>  
            </div>
                
            <TextArea
                placeholder="Escreva aqui sua avaliação"
                maxCharacters={3000}
                onChange={setText}
            />
                
            <div className="w-full flex items-center justify-end gap-10">
                <div className="flex flex-row gap-3">
                    Enviar avaliação anônima
                    <Switch checked={anonymous} onChange={setAnonymous}/>
                </div>
                <button className="btn-primary" onClick={handleSubmit}>
                    Publicar avaliação
                </button>
            </div>  
        </div>  
    )
}