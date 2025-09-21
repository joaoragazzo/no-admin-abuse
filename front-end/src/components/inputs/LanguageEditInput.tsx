import type { TranslationCellDTO } from "@/interfaces/translation/TranslationTableDTO";
import { useState } from "react";
import TranslationService from "@/services/TranslationService";
import { Button, Space } from "antd";
import { FaSave } from "react-icons/fa";
import { Input } from "./Input";
import { useToast } from "@/hooks/useToast";

interface LanguageEditInputProps {
    translation: TranslationCellDTO
}

export const LanguageEditInput: React.FC<LanguageEditInputProps> = ({ translation }) => {
  const { success } = useToast();
  const [initialValue, setInitialValue] = useState<string | null>(translation.value)

  const handleSaveEdit = () => {
    TranslationService.saveTranslation({id: translation.id, value: initialValue})
      .then((res) => {
        success("translation_success_saved");
        setInitialValue(res.tValue || "");    
    }); 
  }

  return (
    <Space.Compact 
            className="z-0 relative w-70"
          >
            <Input 
              value={initialValue}
              status={initialValue ? undefined : "warning"}
              className="z-3"
              onChange={setInitialValue}
              
            />
            <Button 
              icon={<FaSave />}
              variant="outlined"
              onClick={handleSaveEdit}
            />
          </Space.Compact>
  );
}