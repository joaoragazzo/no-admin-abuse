import type React from "react";
import { FaCrown, FaGlobe, FaInfoCircle, FaSearch, FaServer, FaStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { ServerCard } from "../components/cards/ServerCard";
import { BestServerCard } from "../components/cards/BestServerCard";
import { Regions } from "../components/enums/regions";
import type { ServerGroupDTO } from "@/interfaces/ServerGroupDTO";
import { useEffect, useState } from "react";
import serverService from "@services/ServerService";
import type { Pageable } from "@/interfaces/Pageable";
import { Pagination } from "@/components/table/Pagination";


export const ServerList: React.FC = () => {
    const { game } = useParams<{ game: string }>();
    const [serverList, setServerList] = useState<Pageable<ServerGroupDTO> | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        serverService.fetchAllServers({page: currentPage}).then(
            response => setServerList(response)
        );
    }, [currentPage]);

    const getGameName = (name: string | undefined): string => {
        switch (name) {
            case 'dayz':
                return "DayZ"
            default:
                return "Unknown"
        }
    }

    return (
        <>
            <div className="flex flex-col my-10 items-center justify-center gap-5">
                <div className="font-bold items-center flex flex-row gap-4 text-3xl">
                    <div className="text-lg bg-blue-500 px-2 rounded">
                        {getGameName(game)[0]}
                    </div>
                    {getGameName(game)}
                </div>
                <div className="font-bold text-4xl w-150 flex justify-center text-center">
                    Ranking dos Melhores Servidores
                </div>
                <div className="font-normal text-md text-gray-300 w-150 flex justify-center text-center">
                    Descubra os servidores de DayZ mais bem avaliados pela comunidade. 
                    Sobreviva, explore e encontre o servidor perfeito para sua jogatina.
                </div>
            </div>

            <div className="flex flex-row justify-center gap-5 mb-20">
                <button className="bg-blue-500 items-center px-5 cursor-pointer hover:bg-blue-600 rounded py-2 text-sm font-semibold flex flex-row gap-2">
                    <FaServer /> Registrar um novo servidor
                </button>
                <button className="bg-gray-800 px-5 rounded cursor-pointer hover:bg-gray-700 flex flex-row py-2 gap-2 text-sm font-semibold items-center">
                    <FaInfoCircle /> Como Funciona o Raking
                </button>
            </div>

            <div className="border-1 border-blue-500 mx-10 my-5 rounded p-5">
                <div className="flex flex-row justify-between items-center mb-5">
                    <div className="font-bold">
                        Filtros
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="py-1 px-5 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded text-sm">Mais populares</button>
                        <button className="py-1 px-5 bg-gray-800 cursor-pointer hover:bg-gray-600 rounded text-sm">Melhor Avaliados</button>
                        <button className="py-1 px-5 bg-gray-800 cursor-pointer hover:bg-gray-600 rounded text-sm">Mais Recentes</button>
                    </div>  
                </div>

                <div className="mb-5 flex flex-row gap-5">
                    <div className="flex flex-col w-full">
                        <div className="text-xs text-gray-500 mb-2">
                            Buscar Servidor
                        </div>
                        <div className="relative">
                            <input className="border-1 border-gray-700 text-sm px-4 py-2 pl-10 bg-gray-800 rounded w-full" placeholder="Nome ou IP do servidor..." />
                            <div className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" >
                                <FaSearch />
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col w-full">
                        <div className="text-xs text-gray-500 mb-2">
                            Região
                        </div>
                        <div>
                            <select className="border-1 border-gray-700 text-sm px-4 py-2  bg-gray-800 rounded w-full" value={"aaa"}>
                                <option value="all">Todas as regiões</option>
                                <option value="all">América do Norte</option>
                                <option value="all">América do Sul</option>
                                <option value="all">Europa</option>
                                <option value="all">Ásia</option>
                                <option value="all">Oceania</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex flex-col w-full">
                        <div className="text-xs text-gray-500 mb-2">
                            Mapa
                        </div>
                        <div>
                            <select className="border-1 border-gray-700 text-sm px-4 py-2  bg-gray-800 rounded w-full" value={"aaa"}>
                                <option value="all">Todas os mapas</option>
                                <option value="all">Chernarus</option>
                                <option value="all">Namalsk</option>
                                <option value="all">Deer isle</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="text-xs text-gray-500 mb-1">
                        Tags
                    </div>
                    <div className="flex flex-wrap text-nowrap flex-row gap-2">
                        <div className="cursor-pointer text-xs bg-blue-700 py-0.5 px-3 rounded-full">PvP</div>
                        <div className="cursor-pointer text-xs bg-blue-700 py-0.5 px-3 rounded-full">PvE</div>
                        <div className="cursor-pointer text-xs bg-blue-700 py-0.5 px-3 rounded-full">Vanilla</div>
                        <div className="cursor-pointer text-xs bg-blue-700 py-0.5 px-3 rounded-full">Vanilla+</div>
                        <div className="cursor-pointer text-xs bg-blue-700 py-0.5 px-3 rounded-full">Vanilla++</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Full PvP</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Full Mod</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Deathmatch</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">No raid</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">1PP</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">3PP</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Roleplay</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">No Base</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Helicoptero</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Solo</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Duo</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Trio</div>
                        <div className="cursor-pointer text-xs bg-gray-700 py-0.5 px-3 rounded-full">Squad</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4 mx-10 mb-10">
                <div className="border-1 border-blue-500 rounded p-4 items-center w-full gap-4 flex flex-row">
                    <div className="p-3 rounded-full bg-blue-950 w-fit">
                        <FaServer className="text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-gray-400">
                            Servidores
                        </div>
                        <div className="text-xl text-white font-bold">
                            1,248
                        </div> 
                    </div>
                </div>

                <div className="border-1 border-blue-500 rounded p-4 items-center w-full gap-4 flex flex-row">
                    <div className="p-3 rounded-full bg-green-950 w-fit">
                        <FaPeopleGroup className="text-green-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-gray-400">
                            Jogadores Online
                        </div>
                        <div className="text-xl text-white font-bold">
                            24,678
                        </div> 
                    </div>
                </div>

                <div className="border-1 border-blue-500 rounded p-4 items-center w-full gap-4 flex flex-row">
                    <div className="p-3 rounded-full bg-yellow-950 w-fit">
                        <FaStar className="text-yellow-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-gray-400">
                            Avaliações
                        </div>
                        <div className="text-xl text-white font-bold">
                            3,721
                        </div> 
                    </div>
                </div>

                <div className="border-1 border-blue-500 rounded p-4 items-center w-full gap-4 flex flex-row">
                    <div className="p-3 rounded-full bg-purple-950 w-fit">
                        <FaGlobe className="text-purple-400" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs text-gray-400">
                            Regiões
                        </div>
                        <div className="text-xl text-white font-bold">
                            5
                        </div> 
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row items-center mx-10 gap-3 font-bold my-2.5">
                <FaCrown className="text-yellow-400 text-2xl animate-swing"/>Servidor em Destaque
            </div>

            <BestServerCard 
                name="DayZ Apocalypse"
                rating={5}
                ratings={1.245}
                description="Servidor hardcore PvP com economia balanceada, eventos semanais e uma comunidade ativa. Mods cuidadosamente selecionados para melhorar a experiência sem comprometer a essência do DayZ."
                tags={["PvP", "Modded", "Alta população", "Eventos", "HardCore"]}
                maxPlayer={100}
                onlinePlayers={96}
                region={Regions.EUROPE}
                uptime={99.4}
                administrationTeam="DayZ Administration Team"
                ms={32}
                verified
            />

            <div className="flex flex-row items-center mx-10 gap-3 font-bold mb-2">
                Top Servidores de DayZ
            </div>
            
            <div className="flex flex-col mx-10 gap-5 mb-5">

                {serverList?.content.map((content, key) => (
                    <ServerCard
                        key={key}
                        name={content.name}
                        description="Servidor focado em roleplay imersivo com regras rígidas e uma comunidade dedicada. Experiência hardcore com foco em sobrevivência e interações realistas entre jogadores."
                        rating={4.0}
                        feedbackCount={327}
                        onlinePlayers={87}
                        maxPlayers={100}
                        servers={content.servers}
                    />
                ))}

            
                <Pagination currentPage={currentPage} totalPages={serverList?.totalPages} onPageChange={(number) => {setCurrentPage(number)}}/>

                

            </div>

        </>
    );
}