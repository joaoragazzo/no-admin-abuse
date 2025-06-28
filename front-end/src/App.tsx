import { FaArrowRight, FaShieldAlt, FaSkull, FaStar } from "react-icons/fa"
import { Header } from "./components/Header"
import { Section } from "./components/template/Section"
import { RatedServer } from "./components/cards/RatedServer"

function App() {
  return (
    <>
      <Header />
      <Section className="mt-10 mb-10">
        <div className="flex flex-row gap-10">
          <div className="w-200 h-100  flex flex-col justify-center items-center">
            <div className="flex flex-col p-20 gap-8">
              <div className="font-extrabold text-4xl/8">
                <span className="text-red-700">Justiça</span><br/>
                <span>nos servidores</span>
              </div>
              
              <span className="text-gray-100 text-lg/6 font-normal">
                Denuncie abusos de autoridade, avalie servidores e 
                ajude a comunidade a encontrar ambientes de jogo 
                justos e seguros. 
              </span>

              <div className="flex flex-row gap-5">
                <button className="px-7 py-2 cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md">Fazer uma denúncia</button>
                <button className="px-7 py-2 cursor-pointer border-1 border-blue-400 rounded-md">Ver lista de servidores</button>
              </div>

            </div>
          </div>
          <div className="w-200 h-100 flex justify-center items-center p-20">
            <FaShieldAlt size={200}/>
          </div>

        </div>
      </Section>

      <Section className="h-200">
        <div
          className="flex justify-center text-3xl font-bold mb-10"
        >
          Servidores&nbsp;<span className="text-blue-500">Avaliados</span>
        </div>
        {/* Cards */}
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
    </>
  )
}

export default App
