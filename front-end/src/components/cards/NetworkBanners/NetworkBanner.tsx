import type { ServerDTO } from "@/interfaces/ServerDTO"
import { useState } from "react"
import { FaAngleRight, FaCrown, FaFlag, FaHammer, FaServer } from "react-icons/fa"
import { FaPeopleGroup, FaX } from "react-icons/fa6"
import { BsInfoCircle } from "react-icons/bs"
import Popup from "reactjs-popup"
import { BiInfoCircle } from "react-icons/bi"
import { NetworkServer } from "./NetworkServer"
import { Rating } from "@/components/misc/Rating"
import { useNavigate } from "react-router-dom"

interface NetworkBannerProps {
    id: string,
    name: string,
    rating: number,
    feedbackCount: number,
    description: string,
    servers: ServerDTO[]
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
    id,
    name,
    // rating,
    feedbackCount,
    description,
    servers,
}) => {
    const navigate = useNavigate();
    const [showServers, setShowServers] = useState<boolean>(false);
    const [moreOptions, setMoreOptions] = useState<boolean>(false);
    const [reportPopup, setReportPopup] = useState<boolean>(false);
    const [characters, setCharacters] = useState<number>(0);
    return (
        <>
        <div className="flex flex-row border-1 border-blue-500 p-4 rounded">
            <div className="mr-3 font-bold w-50 h-maxcontent bg-blue-950 rounded items-center flex justify-center text-center">
                {name}
            </div>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col justift-between gap-3">
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="font-bold text-md flex items-center gap-2">
                                {name} 
                                <Popup
                                    trigger={<BsInfoCircle size={13} className="text-gray-300 hover:text-white cursor-pointer" onClick={() => { navigate(`/network/${id}`) }}/> }
                                    position={'top center'}
                                    on={['hover']}
                                >
                                    <div className="text-xs px-2 py-0.5 bg-white rounded text-black">
                                        Mais informações
                                    </div>
                                </Popup>
                                
                                <Popup
                                    trigger={<FaFlag  onClick={() => {setMoreOptions(!moreOptions)}} size={13} className="text-gray-300 hover:text-white cursor-pointer"/>}
                                    position={'top center'}
                                    on={['hover']}
                                >
                                    <div className="text-xs px-2 py-0.5 bg-white rounded text-black">
                                        Mais opções
                                    </div>
                                </Popup>
                                <div 
                                    className={`${moreOptions ? "max-w-[1000px] opacity-100" : "max-w-0 opacity-0"} flex flex-row gap-2 text-xs font-semibold overflow-hidden transition-all duration-800 ease-in-out`}>
                                    <button className="text-nowrap rounded bg-red-700 px-3 flex items-center gap-1.5 py-1 cursor-pointer hover:bg-red-800" onClick={() => {setReportPopup(true)}}>
                                        <FaX /> Reportar servidor
                                    </button>
                                    <button className="text-nowrap rounded bg-green-500 px-3 flex items-center gap-1.5 py-1 cursor-pointer hover:bg-green-600">
                                        <FaCrown /> Reivindicar marca
                                    </button>
                                </div>
                                
                            </div>
            
                            <div className="flex flex-row gap-4">
                                <div className="text-green-500 flex-row flex items-center gap-1 text-sm">
                                    <FaPeopleGroup /> {servers.reduce((acc, curr) => acc + curr.onlinePlayers, 0)}/{servers.reduce((acc, curr) => acc + curr.maxPlayers, 0)}
                                </div>
                            </div>
                        </div>
                                        
                        <div className="text-xs text-gray-300 flex items-center gap-1">
                            {servers.length} servidor{servers.length != 1 && "es"}
                        </div>
                    </div>
                                
                    <div className="flex flex-row gap-2 text-xs">
                       <Rating rating={1} />
                        <div className="text-blue-500 flex flex-row items-center border-b-1 mb-0.5 cursor-pointer">
                            ({feedbackCount} avaliações) <FaAngleRight size={11} />
                        </div>
                    </div>
                    
                    <div className="text-sm text-gray-400">
                        {description}
                        <div className="flex justify-end flex-row gap-3 text-white">
                            <button 
                                onClick={() => {setShowServers(!showServers)}}
                                className="flex items-center gap-2 text-xs bg-blue-600 rounded px-3 py-1 font-semibold hover:bg-blue-700 cursor-pointer">
                                <FaServer /> Ver servidores
                            </button>
                        </div>
                    </div>
                </div>
                
                <div
                    className={`
                        mt-2.5 overflow-hidden transition-all duration-800 ease-in-out
                        ${showServers ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}
                        flex flex-col gap-2.5
                    `}
                >
                    {servers.map((server, index) => (
                        <NetworkServer key={index} server={server} />
                    ))}
                </div>
            </div>
        </div>

        <Popup
            open={reportPopup}
            overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.28)'}}
            onClose={() => {setReportPopup(false)}}
        >
            <div className="min-w-2xl max-w-2xl">
                <div className="rounded-t-xl bg-gray-800 px-5 py-2 flex items-center justify-between">
                    <div>
                        Reportar conteúdo do rede de servidores <strong>{name}</strong>  
                    </div>
                    <div>
                        <FaX className="cursor-pointer" onClick={() => {setReportPopup(false)}}/>
                    </div> 
                </div>
                <div className="rounded-b-xl bg-gray-900 px-5 py-4 flex flex-col">
                    <div className="mt-2 relative border border-white/30 rounded px-3 py-4 text-sm">
                        <div className="absolute -top-2.5 left-3 bg-gray-900 px-2 text-white text-xs">
                            Considerações importantes
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row gap-2.5">
                                <FaX className="text-red-500" size={23} /> 
                                <div className="text-justify">
                                    Esta secção é utilizada apenas para realizar denúncias{" "}
                                    <strong>sobre o conteúdo apresentado exclusivamente 
                                    nesse site</strong>. Você pode fazer uma avaliação ou denúncia 
                                    desta rede de servidores desta grupo <span className="cursor-pointer text-blue-500 hover:text-blue-400">clicando aqui</span>.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3 text-sm">
                        <div className="font-semibold text-lg">
                            Preencha o formulário abaixo
                        </div>

                        <div className="mt-2">
                            <div>
                                <div>Motivo da denúncia<span className="text-red-600 ml-1 text-sm">*</span></div>
                                <select className="px-4 border-1 rounded border-white/60 py-1.5 w-full focus:border-blue-500">
                                    <option value="" disabled selected>Selecione o motivo da denúncia</option>
                                    <option>Spam</option>
                                    <option>Informações incorretas</option>
                                    <option>Simplesmente não gostei</option>
                                    <option>Conteúdo impróprio (racismo, preconceito, xenofobia...)</option>
                                    <option>Práticas abusivas (por exemplo, uso de bots para avaliações massivas)</option>
                                </select>
                            </div>
                            
                            <div className="flex flex-col mt-5">
                                <div className="text-sm">Mais detalhes</div>
                                <textarea 
                                    placeholder="Ofereça mais detalhes..." 
                                    className="rounded border-white/60 border-1 p-2 resize-none h-30" 
                                    onChange={(e) => {setCharacters(e.target.value.length)}}
                                    maxLength={300}
                                />
                                <div className="text-right text-sm text-gray-400 mt-1">{characters}/300</div>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between">
                            <small className="flex items-center gap-1 cursor-pointer"><BiInfoCircle /> Saiba mais sobre nossas Diretrizes e Políticas de Privacidade</small>
                            <button className="flex flex-row gap-2 items-center bg-red-700 rounded px-2 hover:bg-red-800 cursor-pointer py-1">
                                <FaHammer /> Denúnciar
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Popup>
        </>
    )
}