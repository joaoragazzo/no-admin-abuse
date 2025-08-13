import type React from "react";
import { Section } from "../components/template/Section";
import { HeroSection } from "../components/sections/HeroSection";
import { Metrics } from "../components/sections/metrics/Metrics";
import { RatedServer } from "../components/cards/RatedServer";
import { FaSkull } from "react-icons/fa";
import { EulaPopup } from "@/components/popups/EulaPopup";
import { useAuth } from "@/contexts/AuthContext";

export const Home: React.FC = () => {
    const { user } = useAuth();
  
    return (
    <>
        <Section className="py-20 bg-[url('/topography.svg')] bg-repeat bg-center bg-[length:500px] flex justify-center">
          <HeroSection />
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
              description="Diversas avaliações falam sobre atraso em suporte, wipes muito rápidos e administrador autoritário"
              badTags={["Suporte ruim", "Abandonado", "Negligência"]}
              goodTags={[]}
              rating={1}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="Diversas denúncias de ataques em outros servidores, administrador autoritário e ausência de suporte"
              badTags={["Suporte ruim", "Negligência"]}
              goodTags={["Eventos"]}
              rating={3}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="Lorem Ipsum"
              badTags={["Suporte ruim"]}
              goodTags={["Eventos", "Staff imparcial"]}
              rating={4}
            />

            <RatedServer 
              serverName="Lorem Ipsum"
              serverIcon={<FaSkull />}
              online={true}
              description="Lorem Ipsum"
              badTags={["Lorem Ipsum"]}
              goodTags={[]}
              rating={1}
            /> 

          </div>
        </Section>

        <EulaPopup open={!(user?.eula)}/>
    </>
        
    )
}