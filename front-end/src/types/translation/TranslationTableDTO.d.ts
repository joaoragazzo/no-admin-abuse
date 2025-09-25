export interface TranslationCellDTO {
  id: string;
  value: string | null;
}

export interface TranslationRowDTO {
  namespace: string;
  key: string;
  translations: {
    [lang: string]: TranslationCellDTO;
  };
}

export interface TranslationTableDTO {
  langs: string[];
  namespaces: string[];
  content: TranslationRowDTO[];
}
  