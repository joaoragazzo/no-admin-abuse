import type { TranslationCellDTO } from "@/types/translation/TranslationTableDTO";
import { useState } from "react";
import { Button, Space } from "antd";
import { FaSave } from "react-icons/fa";
import { Input } from "./Input";
import { useAdminTranslation } from "@/contexts/AdminTranslationContext";

interface LanguageEditInputProps {
    translation: TranslationCellDTO

}

export const LanguageEditInput: React.FC<LanguageEditInputProps> = ({ translation }) => {
  const { handleTranslationUpdate } = useAdminTranslation();
  const [initialValue, setInitialValue] = useState<string | null>(translation.value)

  return (
    <Space.Compact 
      className="z-0 relative"
    >
      <Input 
        value={initialValue}
        status={initialValue ? undefined : "warning"}
        onChange={setInitialValue}
        className="w-63"
        
      />
      <Button 
        icon={<FaSave />}
        variant="outlined"
        onClick={() => {
          handleTranslationUpdate({id: translation.id, value: initialValue})
        }}
      />
    </Space.Compact>
  );
}