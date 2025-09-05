import { useEffect, useState } from "react";
import { PageTitle } from "./PageTitle";
import TranslationService from "@/services/TranslationService";
import type { TranslationTableDTO } from "@/interfaces/TranslationTableDTO";
import { TranslationTable } from "@/components/table/TranslationTable";

export const AdminTranslations: React.FC = () => {
  const [translationTable, setTranslationTable] = useState<TranslationTableDTO | null>(null);

  useEffect(() => {
    TranslationService.fetchTranslationTable().then((response) =>
      setTranslationTable(response)
    );
  }, []);

  if (!translationTable) return <div>Carregando...</div>;

  return (
    <>
      <PageTitle main="Traduções" />
      <div className="overflow-x-auto border rounded-md border-slate-300">
        <TranslationTable data={translationTable} />
      </div>
    </>
  );
};