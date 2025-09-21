import type React from "react"
import type { TranslationCellDTO, TranslationTableDTO } from "@/types/translation/TranslationTableDTO"
import { Table } from "antd"
import { LanguageEditInput } from "../inputs/LanguageEditInput"

interface TranslationTableProps {
  data: TranslationTableDTO | null
}

export const TranslationTable: React.FC<TranslationTableProps> = ({ data }) => {  
  
  if (!data) {
    return <Table
      className="h-100"
      loading
    />
  }

  const tableData = data.content.map((item, index) => {
    const row: any = {
      key: index,
      translationKey: item.key,
    };
  
    data.langs.forEach(lang => {
      row[lang] = item.translations[lang];
    });
  
    return row;
  });
  
  const columns = [
    {
      title: 'Key',
      dataIndex: 'translationKey',
      key: 'translationKey',
      fixed: 'left' as const,
      width: 150,
      render: (text: string) => <span className="!font-mono">{text}</span>
    },
    ...data.langs.map(lang => ({
      title: lang.toUpperCase(),
      dataIndex: lang,
      key: lang,
      render: (translation: TranslationCellDTO) => 
          <LanguageEditInput translation={translation}/>
          
    }))
  ];

  return (
    <Table 
      columns={columns}
      dataSource={tableData}
      scroll={{ x: 'max-content'}}
      loading={!data}
    />
  )
}