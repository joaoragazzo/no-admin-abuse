import type React from "react";
import { FaGlobe, FaInfoCircle, FaSearch, FaServer, FaStar } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { NetworkBanner } from "../components/cards/NetworkBanners/NetworkBanner";
import type { NetworkDTO } from "@/types/network/NetworkDTO";
import { useEffect, useRef, useState } from "react";
import serverService from "@/services/ServerService";
import type { Pageable } from "@/types/Pageable";
import { Pagination } from "@/components/table/Pagination";
import { useTranslation } from "react-i18next";
import { CountUp } from "@/components/misc/CountUp";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { Tag } from "@/components/misc/Tag";
import { Input } from "@/components/inputs/Input";
import { Select } from "@/components/inputs/Select";
import { Button, Skeleton } from "antd";
import NetworkService from "@/services/NetworkService";


export const NetworkList: React.FC = () => {
    const { game } = useParams<{ game: string }>();
    const navigate = useNavigate();

    if (!game) {
        navigate("/");
        return null;
    }

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isFilterChange, setIsFilterChange] = useState<boolean>(false);

    const [tags, setTags] = useState<string[]>([]);
    
    const { t: tagsTranslation } = useTranslation('tags');
    const [tagsLoading, setTagsLoading] = useState<boolean>(true);
    
    const [searchText, setSearchText] = useState<string>("");
    const [activeTags, setActiveTags] = useState<Set<string>>(new Set<string>());
    const [region, setRegion] = useState<string|null>(null);

    const networkListHeader = useRef<HTMLDivElement>(null);

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

    const debouncedSearch = useDebounce(searchText, 500);
    const { data: serverList, isLoading } = useQuery<Pageable<NetworkDTO>>({
    queryKey: ["servers", currentPage, activeTags, debouncedSearch, region],
    queryFn: () =>
        NetworkService.fetchAllNetworks({
        page: currentPage - 1,
        tags: Array.from(activeTags),
        search: debouncedSearch,
        region: region,
        gameSlug: game
        }),
    enabled: !isFilterChange,
    });

    useEffect(() => {
        if (isFilterChange) {
          setIsFilterChange(false);
        }
      }, [isFilterChange]);

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
                    <Button type="primary">
                        <FaServer /> Registrar um novo servidor
                    </Button>
                    <Button>
                        <FaInfoCircle /> Como Funciona o Raking
                    </Button>
                </div>
            </div>
            
        </div>

        <div className="flex justify-center">
            <div className="max-w-400 w-full">
                <div className="border-1 border-neutral-700 mx-10 my-5 rounded p-5">
                    <div className="flex flex-row justify-between mb-5">
                        <div className="font-bold">
                            Filtros
                        </div>
                        <div className="flex flex-wrap flex-col md:flex-nowrap md:flex-row gap-3">
                            <Button>Mais populares</Button>
                            <Button disabled>Melhor Avaliados</Button>
                            <Button disabled>Mais Recentes</Button>
                        </div>  
                    </div>

                    <div className="mb-5 flex flex-col md:flex-row gap-5">
                        <Input 
                            Icon={FaSearch}
                            placeholder="Nome do servidor..."
                            label="Buscar servidor"
                            onChange={setSearchText}
                            value={searchText}
                            className="w-full"
                        />

                        <Select 
                            label="Região"
                            options={[
                                {value: "AFRICA", label: "África"},
                                {value: "ASIA", label: "Ásia"},
                                {value: "EUROPE", label: "Europa"},
                                {value: "NORTH_AMERICA", label: "América do Norte"},
                                {value: "SOUTH_AMERICA", label: "América do Sul"},
                                {value: "OCEANIA", label: "Oceania"},
                                {value: "ANTARCTICA", label: "Antártida"}
                            ]}
                            placeholder="Todas as regiões"
                            className="w-full"
                            onChange={setRegion}
                            value={region}
                        />
                        <Select 
                            label="Mapa"
                            placeholder="Todos os mapas"
                            options={[
                                {value: "all", label: "Chernarus"},
                                {value: "all", label: "Namalsk"},
                                {value: "all", label: "Deer Isle"},
                            ]}
                            className="w-full"
                            disabled
                            value={null}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="text-xs text-gray-500 mb-1">
                            Tags
                        </div>
                        <div className="flex flex-wrap text-nowrap flex-row gap-2">
                            {
                                tagsLoading ? 
                                    [...Array(20)].map(() => (<Skeleton.Node active className="w-17 h-5 rounded-full"/>))
                                : 
                                tags.map((value) => (
                                    <Tag
                                        color="gray"
                                        id={value} 
                                        onClick={() => {toggleTag(value)}}
                                        className={activeTags.has(value) ? "!bg-blue-700" : ""}
                                    >
                                        {tagsTranslation(value)}
                                    </Tag>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-nowrap flex-wrap gap-4 mx-10 mb-10">
                    <div className="border-1 border-neutral-700 rounded p-4 items-center w-full gap-4 flex flex-row">
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

                    <div className="border-1 border-neutral-700 rounded p-4 items-center w-full gap-4 flex flex-row">
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

                    <div className="border-1 border-neutral-700 rounded p-4 items-center w-full gap-4 flex flex-row">
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

                    <div className="border-1 border-neutral-700 rounded p-4 items-center w-full gap-4 flex flex-row">
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

                <div ref={networkListHeader} className="flex flex-row items-center mx-10 gap-3 font-bold mb-2">
                    Top Servidores de DayZ
                </div>
                
                <div className="flex flex-col sm:mx-10 sm:gap-5 mb-5">
                    {isLoading && [...Array(10)].map(() => (<Skeleton.Node active className="w-full h-45 rounded-md"/>))}
                    
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
                
                    <Pagination currentPage={currentPage} totalPages={serverList?.totalPages} onPageChange={
                        (number) => {
                            setCurrentPage(number)
                            networkListHeader.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }/>

                </div>
            </div>
        </div>
        </>
    );
}