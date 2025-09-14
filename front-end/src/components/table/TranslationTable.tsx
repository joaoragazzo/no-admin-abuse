import type React from "react"
import type { TranslationTableDTO } from "@/interfaces/TranslationTableDTO"
import { Button, Input, Space, Table } from "antd"
import { FaSave } from "react-icons/fa"

interface TranslationTableProps {
    data: TranslationTableDTO
}

export const TranslationTable: React.FC<TranslationTableProps> = ({ data }) => {  
  const tableData = data.content.map((item, index) => {
    const row: any = {
      key: index,
      translationKey: item.key,
    };

    data.langs.forEach(lang => {
      row[lang] = item.translations[lang]?.value || '';
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
      render: (text: string) => <code>{text}</code>
    },
    ...data.langs.map(lang => ({
      title: lang.toUpperCase(),
      dataIndex: lang,
      key: lang,
      render: (text: string) => 
          <Space.Compact 
            className="z-0 relative w-70"
          >
            <Input 
              value={text}
              status="warning"
              className="z-3"
              
            />
            <Button 
              icon={<FaSave />}
              variant="outlined"
            />
          </Space.Compact>
          
    }))
  ];


  return (
    <Table 
      columns={columns}
      dataSource={tableData}
      bordered
      scroll={{ x: 'max-content'}}
      
    />
  )
}