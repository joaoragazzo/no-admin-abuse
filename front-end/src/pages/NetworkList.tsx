import type React from "react";
import { FaGlobe, FaInfoCircle, FaSearch, FaServer, FaStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { NetworkBanner } from "../components/cards/NetworkBanners/NetworkBanner";
import type { NetworkDTO } from "@/interfaces/NetworkDTO";
import { useEffect, useState } from "react";
import serverService from "@services/ServerService";
import type { Pageable } from "@/interfaces/Pageable";
import { Pagination } from "@/components/table/Pagination";
import { useTranslation } from "react-i18next";
import { Region } from "@/enums/Region";
import { CountUp } from "@/components/misc/CountUp";


export const NetworkList: React.FC = () => {
    const { game } = useParams<{ game: string }>();
    const [serverList, setServerList] = useState<Pageable<NetworkDTO> | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterChange, setIsFilterChange] = useState<boolean>(false);

    const [tags, setTags] = useState<string[]>([]);
    
    const { t: tagsTranslation } = useTranslation('tags');
    const { t: regionsTranslation } = useTranslation('regions');
    const [tagsLoading, setTagsLoading] = useState<boolean>(true);
    
    const [searchText, setSearchText] = useState<string>("");
    const [activeTags, setActiveTags] = useState<Set<string>>(new Set<string>());
    const [region, setRegion] = useState<string|null>(null);

    const toggleTag = (tag: string) => {
        const temp = new Set<string>(activeTags);
        if (temp.has(tag)) {
            temp.delete(tag)
        } else {
            temp.add(tag);
        }
        setActiveTags(temp);
    }

    useEffect(() => {
        setIsFilterChange(true)
        setCurrentPage(1);
    }, [activeTags, searchText, region]);

    useEffect(() => {
        if (isFilterChange) {
            setIsFilterChange(false);
            return;
          }

        serverService.fetchAllNetworks({
            page: currentPage - 1,
            tags: Array.from(activeTags),
            search: searchText,
            region: region
        }).then(response => setServerList(response));

    }, [currentPage, activeTags, searchText, region, isFilterChange]);

    const getGameName = (name: string | undefined): string => {
        switch (name) {
            case 'dayz':
                return "DayZ"
            default:
                return "Unknown"
        }
    }

    useEffect(() => {
        serverService.fetchAllTags().then(
            response => {
                setTags(response.tags);
                setTagsLoading(false);
            }
        )
    }, []);

    return (
        <>
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="max-w-200 flex items-center flex-col gap-5 p-10">
                <div className="font-bold items-center flex flex-row gap-4 text-3xl">
                    <div className="text-lg bg-blue-500 px-2 rounded">
                        {getGameName(game)[0]}
                    </div>
                    {getGameName(game)}
                </div>
                <div>
                    <div className="font-bold text-4xl  flex justify-center text-center">
                        Ranking dos Melhores Servidores
                    </div>
                    <div className="font-normal text-md text-gray-300 flex justify-center text-center">
                        Descubra os servidores de DayZ mais bem avaliados pela comunidade. 
                        Sobreviva, explore e encontre o servidor perfeito para sua jogatina.
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-5 w-full md:w-fit">
                    <button className="justify-center bg-blue-500 items-center w-full md:w-fit px-5 cursor-pointer hover:bg-blue-600 rounded py-2 text-sm font-semibold flex flex-row gap-2">
                        <FaServer /> Registrar um novo servidor
                    </button>
                    <button className="justify-center bg-gray-800 px-5 rounded w-full md:w-fit cursor-pointer hover:bg-gray-700 flex flex-row py-2 gap-2 text-sm font-semibold items-center">
                        <FaInfoCircle /> Como Funciona o Raking
                    </button>
                </div>
            </div>
            
        </div>

        <div className="flex justify-center">
            <div className="w-full">
                <div className="border-1 border-blue-500 mx-10 my-5 rounded p-5">
                    <div className="flex flex-row justify-between mb-5">
                        <div className="font-bold">
                            Filtros
                        </div>
                        <div className="flex flex-wrap flex-col md:flex-nowrap md:flex-row gap-3">
                            <button className="py-1 px-5 bg-blue-500 cursor-pointer hover:bg-blue-600 rounded text-sm">Mais populares</button>
                            <button className="py-1 px-5 bg-gray-800 cursor-pointer hover:bg-gray-600 rounded text-sm">Melhor Avaliados</button>
                            <button className="py-1 px-5 bg-gray-800 cursor-pointer hover:bg-gray-600 rounded text-sm">Mais Recentes</button>
                        </div>  
                    </div>

                    <div className="mb-5 flex flex-col md:flex-row gap-5">
                        <div className="flex flex-col w-full">
                            <div className="text-xs text-gray-500 mb-2">
                                Buscar Servidor
                            </div>
                            <div className="relative">
                                <input onChange={(e) => (setSearchText(e.target.value))} className="border-1 border-gray-700 text-sm px-4 py-2 pl-10 bg-gray-800 rounded w-full" placeholder="Nome ou IP do servidor..." />
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
                                <select 
                                    onChange={
                                        (e) => {
                                            const value = e.target.value;
                                            setRegion(value === "" ? null : value)}
                                    } 
                                    className="border-1 border-gray-700 text-sm px-4 py-2  bg-gray-800 rounded w-full" 
                                    value={region!} 
                                >
                                    <option value="">{regionsTranslation("ALL_REGIONS")}</option>
                                    {
                                        Object.values(Region)
                                        .filter(value => typeof value === 'string')
                                        .map(region => (
                                            <option value={region} key={region}>
                                                {regionsTranslation(region)}
                                            </option>
                                        ))
                                    }
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
                            {
                                tagsLoading ? 
                                    [...Array(20)].map((_, i) => (<div key={i} className="bg-gray-700 animate-pulse w-16 h-6 rounded-full"></div>))
                                : 
                                tags.map((value, key) => (
                                    <div
                                        key={key} 
                                        onClick={() => {toggleTag(value)}}
                                        className={`cursor-pointer text-xs ${activeTags.has(value) ? "bg-blue-700" : "bg-gray-800"}  py-0.5 px-3 rounded-full`}
                                    >
                                        {tagsTranslation(value)}
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-nowrap flex-wrap gap-4 mx-10 mb-10">
                    <div className="border-1 border-blue-500 rounded p-4 items-center w-full gap-4 flex flex-row">
                        <div className="p-3 rounded-full bg-blue-950 w-fit">
                            <FaServer className="text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xs text-gray-400">
                                Servidores
                            </div>
                            <div className="text-xl text-white font-bold">
                                <CountUp end={1000} separator="." />
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
                                <CountUp end={8192} separator="."/>
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
                                <CountUp end={3721} separator="."/>
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
                                <CountUp end={7} />
                            </div> 
                        </div>
                    </div>
                </div>                

                <div className="flex flex-row items-center mx-10 gap-3 font-bold mb-2">
                    Top Servidores de DayZ
                </div>
                
                <div className="flex flex-col sm:mx-10 sm:gap-5 mb-5">

                    {serverList?.content.map((content, key) => (
                        <NetworkBanner
                            key={key}
                            id={content.id}
                            name={content.name}
                            description={content.description}
                            rating={content.reviewsAvg}
                            feedbackCount={content.reviewsCount}
                            servers={content.servers}
                        />
                    ))}
                
                    <Pagination currentPage={currentPage} totalPages={serverList?.totalPages} onPageChange={(number) => {setCurrentPage(number)}}/>

                </div>
            </div>
        </div>
        </>
    );
}