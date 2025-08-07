import type React from "react"
import { GameCard } from "../components/cards/GameCard"

export const GameList: React.FC = () => {
    return (
        <>
            <div className="flex flex-col items-center my-10">
                <div className="text-4xl w-fit font-extrabold mb-3">
                    Selecione um&nbsp;<span className="text-blue-500">Jogo</span>
                </div>
                <div className="flex font-light w-150 text-center text-gray-300 text-sm">
                    Escolha um jogo para ver a lista de redes de servidores, estatísticas de denúncias e avaliações da comunidade
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mx-30 mb-10 max-w-280 min-w-250">
                <GameCard 
                    id="dayz"
                    gameName="DayZ"
                    networkCount="12"
                    ratingCount="453"
                    bgImage="dayz.png"
                />
            </div>
        </>
    )
}