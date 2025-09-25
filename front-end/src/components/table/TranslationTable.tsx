import type React from "react"
import type { TranslationCellDTO } from "@/types/translation/TranslationTableDTO"
import { Table } from "antd"
import { LanguageEditInput } from "../inputs/LanguageEditInput"
import { useAdminTranslation } from "@/contexts/AdminTranslationContext"

interface TranslationTableProps {
  update?: () => void
}

export const TranslationTable: React.FC<TranslationTableProps> = ({ update }) => {  
  const { translationTable } = useAdminTranslation();

  if (!translationTable) {
    return <Table
      className="h-100"
      loading
    />
  }

  const tableData = translationTable.content.map((item, index) => {
    const row: any = {
      key: index,
      translationKey: item.key,
      namespace: item.namespace
    };
  
    translationTable.langs.forEach(lang => {
      row[lang] = item.translations[lang];
    });
  
    return row;
  });
  
  const columns = [
    {
      title: 'Namespace',
      dataIndex: 'namespace',
      key: "namespace",
      fixed: 'left' as const,
      width: 150,
      render: (namespace: string) => <span className="!font-mono">{namespace}</span>
    },
    {
      title: 'Key',
      dataIndex: 'translationKey',
      key: 'translationKey',
      fixed: 'left' as const,
      width: 300,
      render: (text: string) => <span className="!font-mono">{text}</span>
    },
    
    ...translationTable.langs.map(lang => ({
      title: lang.toUpperCase(),
      dataIndex: lang,
      key: lang,
      render: (translation: TranslationCellDTO) => 
          <LanguageEditInput translation={translation} update={update} />
          
    }))
  ];

  return (
    <Table 
      columns={columns}
      dataSource={tableData}
      size="middle"
      scroll={{ x: 'max-content' }}
      loading={!translationTable}
      pagination={false}
    />
  )
}