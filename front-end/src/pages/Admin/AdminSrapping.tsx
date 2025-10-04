import { FaSpider } from "react-icons/fa";
import { PageTitle } from "./PageTitle";

export const AdminScrapping: React.FC = () => {
  return (
    <>
      <PageTitle 
        main="Administração e gestão de" 
        emphasis="scrapping de Servidores" 
        description="Gerencie e monitore o scrapping de servidores de jogos para garantir dados atualizados e precisos."
        Icon={FaSpider}
      />
        <div>
            
        </div>

    </>
  );
}