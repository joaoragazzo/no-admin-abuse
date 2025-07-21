import type React from "react";
import { FaShieldAlt } from "react-icons/fa";

export const HeroSection: React.FC = () => {
    return (
        <div className="flex flex-row gap-10">
          <div className="w-200 h-100  flex flex-col justify-center items-center">
            <div className="flex flex-col p-20 gap-8">
              <div className="font-extrabold text-4xl/10">
                <span className="text-blue-500 text-5xl/8">Justiça</span><br/>
                <span>nos servidores</span>
              </div>
              <span className="text-gray-100 text-lg/6 font-normal">
                Denuncie abusos de autoridade, avalie servidores e 
                ajude a comunidade a encontrar ambientes de jogo 
                justos e seguros. 
              </span>
              <div className="flex flex-row gap-5">
                <button className="px-7 py-2 cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md">Fazer uma denúncia</button>
                <button className="px-7 py-2 cursor-pointer border-1 border-blue-500 rounded-md">Ver lista de servidores</button>
              </div>
            </div>
          </div>
          <div className="w-200 h-100 flex justify-center items-center p-20">
            <FaShieldAlt size={200}/>
          </div>
        </div>
    )
}