import { TextArea } from "@/components/inputs/TextArea"
import { Rating } from "@/components/misc/Rating"
import { Tag } from "@/components/misc/Tag"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FaX } from "react-icons/fa6"

export const NetworkMakeReview = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const toogleTag = (id: string):void => {
        if (selectedTags.includes(id)) {
            setSelectedTags(prev => prev.filter(prev => prev != id));
        } else {
            setSelectedTags(prev => [...prev, id]);
        }
    }

    const mockedGoodTags = ["Staff imparcial", "Eventos", "Baixa latência", "Suporte rápido"]
    const mockedBadTags = ["Pay-2-win", "VIPs muitos caros", "Comunidade tóxica", "Favoritismo"]

    return (
        <div className="flex flex-col gap-2 mt-3">             
            <div className="flex flex-row gap-3 text-gray-200">
                Nota: <Rating rating={3}/>
            </div>

            <div className="mb-2">
                <div className="text-green-500 text-sm mb-2 flex flex-row gap-2 items-center">
                    <FaCheck /> Características positivas
                </div>

                <div className="flex flex-row flex-wrap gap-3">
                    {mockedGoodTags.map((content, _) => (
                        <Tag color={selectedTags.includes(content) ? "green" : "gray"} onClick={toogleTag} id={content}>
                            {content}
                        </Tag>
                    ))}
                </div>
                    
                <div className="text-red-500 text-sm mb-2 flex flex-row gap-2 items-center mt-2">
                    <FaX/> Características negativas
                </div>
                
                <div className="flex flex-row flex-wrap gap-3">
                    {mockedBadTags.map((content, _) => (
                        <Tag color={selectedTags.includes(content) ? "red" : "gray"} onClick={toogleTag} id={content}>
                            {content}
                        </Tag>
                    ))}
                </div>  
            </div>
                
            <TextArea
                placeholder="Faça sua avaliação a rede"
                maxCharacters={3000}
            />
                
            <div className="w-full flex items-end justify-end gap-3">
                <button className="btn-primary">
                    Publicar avaliação
                </button>
            </div>  
        </div>  
    )
}