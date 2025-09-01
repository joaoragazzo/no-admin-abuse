export interface TranslationCellDTO {
  id: string;
  value: string | null;
}

export interface TranslationRowDTO {
  key: string;
  translations: {
    [lang: string]: TranslationCellDTO;
  };
}

export interface TranslationTableDTO {
  langs: string[];
  content: TranslationRowDTO[];
}
  