import { FaTrash } from "react-icons/fa";
import { PageTitle } from "./PageTitle";
import { useEffect, useState } from "react";
import { Input } from "@/components/inputs/Input";
import type { TranslationTableDTO } from "@/interfaces/TranslationTableDTO";
import TranslationService from "@/services/TranslationService";

export const AdminTranslations: React.FC = () => {
  const [translationTable, setTranslationTable] = useState<TranslationTableDTO | null>(null);

  useEffect(() => {
    TranslationService.fetchTranslationTable().then(
      (response) => setTranslationTable(response)
    );
  }, []);

  if (!translationTable) return <div>Carregando...</div>;

  return (
    <>
      <PageTitle main="Traduções" />

      <div className="overflow-x-auto">
        <table className="min-w-full rounded-md border border-slate-300 border-separate border-spacing-0 overflow-hidden table-fixed">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-200 uppercase">
              <th className="w-40 pl-5 py-3 tracking-wider border-b border-slate-200">
                Chave
              </th>
              {translationTable.langs.map((lang) => (
                <th
                  key={lang}
                  className="py-3 tracking-wider border-b border-slate-200"
                >
                  {lang.toUpperCase()}
                </th>
              ))}
              <th className="w-10 py-3 tracking-wider border-b border-slate-200">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {translationTable.content.map((row) => (
              <tr
                key={row.key}
                className="transition-colors duration-150 text-slate-200"
              >
                <td className="pl-5 py-4 !font-mono">{row.key}</td>

                {translationTable.langs.map((lang) => {
                  const cell = row.translations[lang];
                  return (
                    <td key={lang} className="py-4">
                      <Input
                        className="w-fit"
                        value={cell?.value ?? ""}
                        onChange={() => {}} // aqui você pluga edição futura
                      />
                    </td>
                  );
                })}

                <td className="py-4 text-sm flex items-center h-14 gap-4">
                  <FaTrash className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
