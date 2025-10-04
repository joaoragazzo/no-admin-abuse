import { Select } from "@/components/inputs/Select";
import { PageTitle } from "./PageTitle";
import { TranslationTable } from "@/components/table/TranslationTable";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";
import { FaLanguage } from "react-icons/fa";

export const AdminTranslations: React.FC = () => {
  const { statsLoading, translationStatistics, 
    translationTable, namespacesOptions, setTableFilter } = useAdminTranslation();
  
  const completionPercentage = Math.round(
    (translationStatistics.completedTranslations / 
      (translationStatistics.completedTranslations + translationStatistics.pendingTranslations)
    ) * 100);

  const statsCards = [
    {
      title: "Namespaces",
      value: translationStatistics.namespacesCount,
      textColor: "text-blue-400"
    },
    {
      title: "Chaves Totais",
      value: translationStatistics.totalKeys,
      textColor: "text-purple-400"
    },
    {
      title: "Concluídas",
      value: translationStatistics.completedTranslations,
      textColor: "text-green-400",
      subtitle: `${completionPercentage}%`
    },
    {
      title: "Pendentes",
      value: translationStatistics.pendingTranslations,
      textColor: "text-amber-400"
    }
  ];

  return (
    <>
      <PageTitle 
        main="Gerenciamento centralizado de" 
        emphasis="Idiomas e Traduções" 
        description="Gerencie e traduza conteúdos para múltiplos idiomas de forma eficiente."
        Icon={FaLanguage}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="relative ishadow-s bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 rounded-xl p-4 hover:border-neutral-600/50 transition-all duration-300 group overflow-hidden"
          >            
            <div className="relative z-10">
              <h3 className="text-gray-400 text-sm font-medium mb-2">
                {card.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className={`${card.textColor} font-bold text-2xl drop-shadow-lg`}>
                  {statsLoading ? "---" : card.value.toLocaleString()}
                </span>
                {card.subtitle && !statsLoading && (
                  <span className="text-gray-500 text-sm">
                    {card.subtitle}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {translationTable && !statsLoading && (
        <div className="rounded-lg p-4 mb-6 ishadow-s bg-gradient-to-br from-neutral-800/80 to-neutral-900/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">Resumo</h3>
              <p className="text-gray-400 text-sm">
                {translationStatistics.totalKeys} chaves • {translationTable.langs.length} idiomas • {completionPercentage}% concluído
              </p>
            </div>
            <div className="w-64 py-2 px-1 items-center flex shadow-inner shadow-black/35 bg-neutral-700 rounded-full h-2">
              <div
                className="bg-green-600 ishadow-l h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {statsLoading && (
        <div className=" rounded-lg p-4 mb-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium mb-1">Resumo</h3>
              <p className="text-gray-400 text-sm">
                Carregando estatísticas...
              </p>
            </div>
            <div className="w-24 bg-gray-700 rounded-full h-2">
              <div className="bg-gray-600 h-2 rounded-full w-0"></div>
            </div>
          </div>
        </div>
      )}

      <div className="ishadow-s p-4 mb-6 rounded-lg flex flex-col bg-gradient-to-br from-neutral-800/40 to-neutral-900">
        <h3 className="font-semibold mb-2">Filtros</h3>
        <div className="flex flex-row gap-3">
          <Select className="w-full" label="Namespace" placeholder={"Todos"} 
            options={[
              {value: null, label: "Todos"},
              ...namespacesOptions
            ]}
            onChange={(c) => setTableFilter((prev) => ({...prev, namespace: c}))}
          />

          <Select className="w-full" label="Status" placeholder={"Todos"} options={[
            {value: null, label: "Todos"},
            {value: "EMPTY", label: "Vazio"},
            {value: "FILLED", label: "Preenchido"}
          ]} 
            onChange={(c) => setTableFilter((prev) => ({...prev, status: c}))}
          />

          <Select className="w-full" label="Jogo" options={[]} disabled/>

        </div>
      </div>

      <div className="overflow-x-auto rounded-md">
        <TranslationTable />
      </div>
    </>
  );
};