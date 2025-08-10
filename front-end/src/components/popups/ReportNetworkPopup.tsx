import { useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { FaHammer } from "react-icons/fa"
import { FaX } from "react-icons/fa6"
import Popup from "reactjs-popup"

interface ReportNetworkPopup {
    open: boolean
    close: React.Dispatch<React.SetStateAction<boolean>>
    name: string
}

export const ReportNetworkPopup: React.FC<ReportNetworkPopup> = ({open, close, name}) => {
    const [characters, setCharacters] = useState<number>(0);
    
    return (
        <Popup
            open={open}
            overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.28)'}}
            onClose={() => {close(false)}}
        >
            <div className="min-w-2xl max-w-2xl">
                <div className="rounded-t-xl bg-gray-800 px-5 py-2 flex items-center justify-between">
                    <div>
                        Reportar conteúdo do rede de servidores <strong>{name}</strong>  
                    </div>
                    <div>
                        <FaX className="cursor-pointer" onClick={() => {close(false)}}/>
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
                                <FaHammer /> Denunciar
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Popup>
    )
}