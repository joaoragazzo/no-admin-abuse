import type React from "react";
import { Section } from "../components/template/Section";
import { Metrics } from "../components/sections/metrics/Metrics";
import { RatedServer } from "../components/cards/RatedServer";
import { FaShieldAlt, FaSkull } from "react-icons/fa";
import { EulaPopup } from "@/components/popups/EulaPopup";
import { Button } from "antd";

export const Home: React.FC = () => {
  
    return (
    <>
        <Section className="py-20 bg-[url('/topography.svg')] bg-repeat bg-center bg-[length:500px] flex justify-center">
          <div className="flex flex-row gap-50 md:gap-30">
            <div className="w-150 h-100 md:w-150 xl:w-200 2xl:w-250 flex flex-col justify-center items-center">
              <div className="flex flex-col p-20 gap-8">
                <div className="font-extrabold text-4xl/10">
                  <span className="text-blue-500 text-5xl/8">Justiça</span><br/>
                  <span>nos servidores</span>
                </div>
                <span className="text-gray-100 text-lg/6 font-normal">
                  Faça avaliações de servidores da comunidade e 
                  ajude a comunidade a encontrar ambientes de jogo 
                  justos e seguros. 
                </span>
                <div className="flex flex-row gap-5">
                  <Button type="primary" className="py-5 font-semibold">Fazer uma avaliação</Button>
                  <Button className="py-5">Ver lista de servidores</Button>
                </div>
              </div>
            </div>
            <div className="w-fit h-100 md:flex justify-center items-center p-20 hidden">
              <FaShieldAlt size={200}/>
            </div>
          </div>
        </Section>

        <Section className="mb-20 bg-gray-900 py-20">
          <Metrics />
        </Section>

        <Section className="mb-20 px-30">
          <div
            className="flex justify-center text-3xl font-bold mb-10"
          >
            Servidores&nbsp;<span className="text-blue-500">Avaliados</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-center items-center">
            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={false}
              description="(Nenhuma descrição fornecida)"
              badTags={["Suporte ruim", "Abandonado", "Negligência"]}
              goodTags={[]}
              rating={1}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="(Nenhuma descrição fornecida)"
              badTags={["Suporte ruim", "Negligência"]}
              goodTags={["Eventos"]}
              rating={3}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="(Nenhuma descrição fornecida)"
              badTags={["Suporte ruim"]}
              goodTags={["Eventos", "Staff imparcial"]}
              rating={4}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="(Nenhuma descrição fornecida)"
              badTags={["Lorem Ipsum"]}
              goodTags={[]}
              rating={1}
            /> 

          </div>
        </Section>

        <EulaPopup />
    </>
        
    )
}