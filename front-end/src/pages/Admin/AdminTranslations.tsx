import { useEffect, useState } from "react";
import { PageTitle } from "./PageTitle";
import TranslationService from "@/services/TranslationService";
import type { TranslationTableDTO } from "@/types/translation/TranslationTableDTO";
import { TranslationTable } from "@/components/table/TranslationTable";

export const AdminTranslations: React.FC = () => {
  const [translationTable, setTranslationTable] = useState<TranslationTableDTO | null>(null);

  useEffect(() => {
    TranslationService.fetchTranslationTable().then((response) =>
      setTranslationTable(response)
    );
  }, []);

  return (
    <>
      <PageTitle main="Traduções" />
      <div className="overflow-x-auto rounded-md">
        <TranslationTable data={translationTable} />
      </div>
    </>
  );
};