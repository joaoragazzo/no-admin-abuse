import type { TranslationCellDTO } from "@/interfaces/TranslationTableDTO";
import { Input } from "./Input";
import clsx from "clsx";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import TranslationService from "@/services/TranslationService";

interface LanguageEditInputProps {
    translation: TranslationCellDTO
}

export const LanguageEditInput: React.FC<LanguageEditInputProps> = ({ translation }) => {
  const [initialValue, setInitialValue] = useState<string | null>(translation.value)
  const [translationValue, setTranslationValue] = useState<string | null>(translation.value)

  const handleSaveEdit = () => {
    TranslationService.saveTranslation({id: translation.id, value: translationValue})
    setInitialValue(translationValue);
  }

  return (
    <div className="flex flex-row gap-3 items-center">
      <Input
        value={translationValue ?? ""}
        onChange={(value) => setTranslationValue(value === "" ? null : value)}
        className={clsx("text-sm min-w-50")}
        type={translationValue == null ? "warning" : undefined}
      />
      {initialValue != translationValue && 
         <button 
          className="border-1 p-1.5 rounded-full border-white/50 cursor-pointer hover:bg-white/10"
          onClick={handleSaveEdit}
        >
          <FaCheck className="text-xs"/>
        </button>
      }
     
    </div>
  );
}