import type React from "react";
import { PopupSkeleton } from "./PopupSkeleton";
import { FaFile } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { useAuth } from "@/contexts/AuthContext";


export const EulaPopup: React.FC = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!!user && !user.eula) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
    
        return () => {
          document.body.style.overflow = '';
        }
      }, [user]
    );

    const [acceptedEula, setAcceptedEula] = useState<boolean>(false);
    const [openedPopup, setOpenedPopup] = useState<boolean>(!!user && !user.eula);

    return <PopupSkeleton
        title={<><FaFile /> Termos de Uso e Políticas de Privacidade</>}
        open={openedPopup}
        onClose={() => {}}
        closeDocumentOnClick={false}
    >
        <div className="mb-5 mt-2 relative border border-white/30 rounded px-3 py-4 text-sm">
            <div className="absolute -top-2.5 left-3 bg-gray-900 px-2 text-white text-sm">
                Termos e Condições de Uso
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2.5 overflow-scroll h-60">
                    <div className="text-justify pr-4">
                        <div className="mb-2">
                            Do uso dos sites sob o domínio noadminabuse.com
                        </div>

                        <div className="mb-2">
                            O No Admin Abuse® convida-o a visitar seu site (endereços sob o domínio 
                            noadminabuse.com) e lhe informa os termos e condições que regem o uso 
                            do mesmo e de seus serviços disponíveis.
                        </div>

                        <div className="mb-2">
                            Por favor, leia atentamente as condições abaixo estipuladas para que você 
                            possa usufruir dos serviços prestados pelo site e lembre-se que ao 
                            utilizá-los ou registrar-se em nossa plataforma você declara ter ciência 
                            do presente Termos e Condições de Uso do Site e concorda com todas as suas 
                            cláusulas e condições.
                        </div>

                        <div className="mb-2">
                            Caso você não concorde com qualquer disposição destes Termos e Condições 
                            de Uso ("Termo"), por favor, não utilize nossos serviços.
                        </div>

                        <div className="mb-2">
                            <strong>1. Dos Serviços</strong>
                        </div>

                        <div className="mb-2">
                            <strong>1.1</strong> O No Admin Abuse® disponibiliza uma plataforma digital, 
                            capaz de reunir informações diversas nela publicadas, acerca de servidores e
                            serviços, fornecidos por empresas ou comunidades, formais ou informais, 
                            tanto para pessoas físicas quanto jurídicas, dentro do que prevê a legislação.
                        </div>

                        <div className="mb-2">
                            <strong>1.1.1</strong> A plataforma permite a livre manifestação dos USUÁRIOS (pessoas físicas 
                            ou jurídicas), sendo garantida a liberdade de expressão, comunicação e 
                            manifestação de pensamento, bem como assegura o direito de resposta, nos termos 
                            da Constituição Federal e do ordenamento jurídico vigente.
                        </div>

                        <div className="mb-2">
                            <strong>1.1.1.1</strong> As manifestações poderão ser: <br/>
                            <strong>(a)</strong> Reclamações acerca de servidores ou serviços prestados, oriundos tanto de pessoas 
                            físicas quanto pessoas jurídicas, direcionados a empresas ou entes da administração 
                            pública direta ou indireta e similares, incluindo, mas não se limitando, entidades de 
                            classe e institutos, que prestem serviços a comunidade de jogos de alguma maneira; <br/>
                            <strong>(b)</strong> Reclamações acerca de problemas ocorridos na prestação de serviços ou no fornecimento 
                            de produtos, oriundos de relações consumeristas; <br/>
                            <strong>(c)</strong> Reclamações sobre experiências ou problemas em relações comerciais diversas, ainda que 
                            não relacionadas a relações de consumo; <br/>
                            <strong>(d)</strong> Avaliações de experiências de compra, atendimento, contratação de serviços, e outros, 
                            ainda que não sejam caracterizadas como relações comerciais, realizadas tanto por pessoa 
                            física quanto por pessoa jurídica; <br/>
                            <strong>(e)</strong> Opiniões ("reviews") advindas da utilização de produtos adquiridos tanto por pessoa 
                            física quanto jurídica;<br/>
                            <strong>(f)</strong> Opiniões ("reviews") tanto de pessoas físicas quanto jurídicas, advindas da percepção 
                            sobre a qualidade do serviço prestado.<br/>
                        </div>

                        <div className="mb-2">
                            1.1.2 As reclamações não estão limitadas fatos e relações efetivamente concretizados, podendo ser publicadas 
                            reclamações que se enquadrem em tentativas ou sobre fatos que afetem, ainda que indiretamente, o Reclamante.
                        </div>

                        <div className="mb-2">
                            1.2 Os serviços disponibilizados pelo No Admin Abuse® poderão incluir o cálculo da reputação das empresas e 
                            produtos no site, baseado nas avaliações e opiniões realizadas tanto por pessoa física quanto jurídica; monitoramento 
                            de preços e condições comerciais de produtos e serviços na Internet; exibição de estatísticas baseadas nas classificações 
                            de reputação de empresas e produtos.
                        </div>

                        <div className="mb-2">
                            1.3 Não coloque seus Dados Pessoais no conteúdo das avaliações, que são abertas ao público em geral, 
                            para evitar o compartilhamento ou uso indevido dos seus Dados Pessoais por terceiros.
                        </div>

                        <div className="mb-2">
                            <strong>2. Dos Serviços Adicionais</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-2 relative border border-white/30 rounded px-3 py-4 text-sm">
            <div className="absolute -top-2.5 left-3 bg-gray-900 px-2 text-white text-md">
                Políticas de Privacidade
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2.5 overflow-scroll h-60">
                    <div className="text-justify pr-4">
                        <div className="mb-3">
                            Nós, NO ADMIN ABUSE (“NO ADMIN ABUSE” ou “nós”), somos uma empresa que oferece 
                            diversos canais de comunicação com o objetivo de melhorar o relacionamento entre 
                            fornecedores e cliente, de forma transparente e colaborativa.
                        </div>

                        <div className="mb-3">
                            Desenvolvemos esse documento em atenção à privacidade e proteção dos dados de nossos 
                            usuários (“Você”). Quando Você acessar ou interagir com o nosso site e aplicativo (“Plataformas”), 
                            podemos guardar algumas informações sobre Você (“Dados” ou “Dados Pessoais”). Elaboramos esta 
                            Política de Privacidade (“Política”) com o intuito de esclarecer como seus Dados Pessoais podem ser 
                            coletados, usados, compartilhados e armazenados por Nós.
                        </div>

                        <div className="mb-3">
                            A partir do momento que Você acessa e interage com nossas Plataformas, 
                            Você declara ciência quanto à forma de tratamento de seus Dados Pessoais 
                            para cada uma das finalidades por Nós aqui descritas, conforme aplicável. 
                            Caso não concorde com esta Política, por favor, não continue utilizando 
                            nossas Plataformas.
                        </div>

                        <div className="mb-3">
                            Com o intuito de facilitar a compreensão, dividimos a Política da seguinte forma:
                        </div>

                        <div className="mb-3">
                            1. Quais tipos de Dados o NO ADMIN ABUSE coleta? <br/>
                            2. Como utilizamos cookies e tecnologias semelhantes? <br/>
                            2.1. O que é um cookie? <br/>
                            2.2. Por que usamos cookies? <br/>
                            2.3. Quais são os parceiros de Publicidade do NO ADMIN ABUSE? <br/>
                            3. Com quem o NO ADMIN ABUSE compartilha os seus Dados? <br/>
                            4. Quais são os direitos dos titulares de Dados? <br/>
                            5. Por quanto tempo os Dados serão armazenados? <br/>
                            6. Como o NO ADMIN ABUSE protege os seus Dados? <br/>
                            7. O NO ADMIN ABUSE realiza transferência internacional de Dados Pessoais? <br/>
                            8. Como falar com o NO ADMIN ABUSE? <br/>
                            9. Atualizações nesta Política <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-4">
            <div className="text-sm mb-2">
                <input type="checkbox" checked={acceptedEula} onChange={(e) => {setAcceptedEula(e.target.checked)}}/> Eu afirmo que li e concordo com os <strong>Termos e Condições de Uso</strong>{" "}e{" "} 
                <strong>Políticas de Privacidade</strong> acima.
            </div>
            
        </div>
        
        <div className="mt-4 flex justify-end">
            <button 
                className="btn-primary" 
                disabled={!acceptedEula}
                onClick={async () => {
                    await UserService.acceptEula();
                    setOpenedPopup(false);
                }}
            >Continuar</button>
        </div>
            
            
    </PopupSkeleton>
}