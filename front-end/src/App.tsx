import { FaSkull } from "react-icons/fa"
import { Header } from "./components/layout/Header"
import { Section } from "./components/template/Section"
import { RatedServer } from "./components/cards/RatedServer"
import { Footer } from "./components/layout/Footer"
import { HeroSection } from "./components/sections/HeroSection"
import { Metrics } from "./components/sections/metrics/Metrics"

function App() {
  return (
    <>
      <Header />
      <Section className="py-20 bg-[url('/topography.svg')] bg-repeat bg-center bg-[length:500px]">
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
            serverName="BioZ"
            serverIcon={<FaSkull />}
            online={false}
            description="Diversas avaliações falam sobre atraso em suporte, wipes muito rápidos e administrador autoritário"
            badTags={["Suporte ruim", "Abandonado", "Negligência"]}
            goodTags={[]}
            rating={1}
          />

          <RatedServer 
            serverName="FavelaZ"
            serverIcon={<FaSkull />}
            online={true}
            description="Diversas denúncias de ataques em outros servidores, administrador autoritário e ausência de suporte"
            badTags={["Suporte ruim", "Negligência"]}
            goodTags={["Eventos"]}
            rating={3}
          />

          <RatedServer 
            serverName="OrigemZ"
            serverIcon={<FaSkull />}
            online={true}
            description="Apesar do suporte lento e demorado, há relatos de staff imparcial e cooperativa, além de diversidade de eventos"
            badTags={["Suporte ruim"]}
            goodTags={["Eventos", "Staff imparcial"]}
            rating={4}
          />

          <RatedServer 
            serverName="O Refúgio"
            serverIcon={<FaSkull />}
            online={true}
            description="kkkkkkkkkkkkkkkkkkkkkkkk"
            badTags={["Tem backdoor no site"]}
            goodTags={[]}
            rating={1}
          /> 
            
        </div>

          
        
      </Section>

      <Footer />

    </>
  )
}

export default App
