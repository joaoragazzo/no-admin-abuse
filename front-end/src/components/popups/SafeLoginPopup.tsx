import type React from "react";
import { FaCheck, FaExternalLinkAlt, FaLock, FaSmile, FaSteam } from "react-icons/fa";
import { FaShield, FaX } from "react-icons/fa6";
import Popup from "reactjs-popup";

interface SafeLoginPopupProps {
  open: boolean;
  onClose: () => void; 
}

export const SafeLoginPopup: React.FC<SafeLoginPopupProps> = ({ open, onClose }) => {
  return (
    <Popup
      open={open}
      onClose={onClose}
      overlayStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
      modal
      closeOnDocumentClick
    >
      <div className="min-w-96 max-w-2xl mx-auto"> {}
        <div className="rounded-t-xl bg-gray-800 px-5 py-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <FaShield />
            <span className="font-medium">Sua conta Steam permanece 100% segura</span>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Fechar"
          >
            <FaX size={14} />
          </button>
        </div>

        <div className="rounded-b-xl bg-gray-900 px-5 py-4 text-white">
          <div className="mb-5">
            <p className="leading-relaxed">
              Para o sistema de login utilizamos o protocolo{" "}
              <a
                href="https://pt.wikipedia.org/wiki/OpenID"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300 transition-colors inline-flex items-center gap-1"
              >
                OpenID
                <FaExternalLinkAlt size={12} />
              </a>
              {" "}da Steam para garantir sua segurança.
            </p>
          </div>

          <div className="relative border border-white/20 rounded-lg px-4 py-4">
            <div className="absolute -top-2.5 left-3 bg-gray-900 px-2 text-sm font-medium text-gray-300">
              Como o OpenID funciona?
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm">
                OpenID permite fazer login sem compartilhar sua senha. Veja o processo:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <FaSteam className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
                  <span>Redirecionamos você para <strong>steamcommunity.com</strong> (site oficial)</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <FaLock className="text-yellow-400 mt-0.5 flex-shrink-0" size={16} />
                  <span>Você faz login normalmente na Steam com suas credenciais</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <FaCheck className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                  <span>A Steam confirma sua identidade para nossa plataforma, onde obtemos somente o Steam64ID</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <FaSmile className="text-purple-400 mt-0.5 flex-shrink-0" size={16} />
                  <span>Você retorna automaticamente, já logado em nosso site</span>
                </li>
              </ul>
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mt-4">
                <div className="flex items-start gap-2">
                  <FaShield className="text-green-400 mt-0.5 flex-shrink-0" size={14} />
                  <div className="text-xs text-green-300">
                    <strong>Importante:</strong> Sua senha nunca é compartilhada conosco. 
                    Sempre verifique se a URL é <code className="bg-gray-800 px-1 py-0.5 rounded">steamcommunity.com</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};