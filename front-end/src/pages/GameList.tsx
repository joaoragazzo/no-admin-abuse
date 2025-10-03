import type React from "react"
import { GameCard } from "../components/cards/GameCard"
import { useEffect, useState } from "react";
import type { GameBannerDTO } from "@/types/GameBannerDTO";
import GameService from "@/services/GameService";

export const GameList: React.FC = () => {
  const [gameList, setGameList] = useState<GameBannerDTO[]>([]);
  
  useEffect(() => {
    document.title = `Jogos | No Admin Abuse`;
  }, []);

  useEffect(() => {
    GameService.fetchAllGames().then(res => setGameList(res));
  },[]);

  return (
    <>
      <div className="flex flex-col items-center my-6 sm:my-10 px-4">
        <div className="text-2xl sm:text-3xl lg:text-4xl w-fit font-extrabold mb-3 text-center">
          Selecione um&nbsp;<span className="text-blue-500">Jogo</span>
        </div>
        <div className="flex font-light max-w-md sm:max-w-lg lg:max-w-2xl text-center text-gray-300 text-xs sm:text-sm text-wrap px-2">
          Escolha um jogo para ver a lista de redes de servidores, estatísticas de denúncias e avaliações da comunidade
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 sm:mx-8 lg:mx-12 mb-10 max-w-7xl mx-auto">
        {gameList.map((content) => (
          <GameCard
            id={content.slug}
            gameName={content.name}
            networkCount={content.networksCount}
            serverCount={content.serversCount}
            ratingCount={content.reviewsCount}
            bgImage={`${content.slug}.png`}
          />
        ))}
        
        
      </div>
    </>
  )
}