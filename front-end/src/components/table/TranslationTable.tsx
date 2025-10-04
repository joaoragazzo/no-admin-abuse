import type React from "react"
import { useRef, useState } from "react"
import type { TranslationCellDTO } from "@/types/translation/TranslationTableDTO"
import { Button, Input, Space, Table } from "antd"
import type { InputRef, TableColumnType } from "antd"
import type { FilterDropdownProps } from "antd/es/table/interface"
import { SearchOutlined } from "@ant-design/icons"

import { LanguageEditInput } from "../inputs/LanguageEditInput"
import { useAdminTranslation } from "@/contexts/AdminTranslationContext"

export const TranslationTable: React.FC = () => {
    const { translationTable } = useAdminTranslation();
    const [, setSearchText] = useState('');
    const [, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    if (!translationTable) {
        return <Table
            className="h-100"
            loading
        />
    }

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: string,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: string): TableColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Buscar ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Buscar
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Fechar
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });

    const tableData = translationTable.content.map((item, index) => {
        const row: any = {
            key: `${item.namespace}-${item.key}-${index}`,
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
            ...getColumnSearchProps('translationKey'),
            render: (text: string) => (
                    <span className="!font-mono">{text}</span>
                )
        },
        ...translationTable.langs.map(lang => ({
            title: lang.toUpperCase(),
            dataIndex: lang,
            key: lang,
            width: 300,
            render: (translation: TranslationCellDTO) =>
                <LanguageEditInput translation={translation} />
        }))
    ];

    return (
      <Table
        columns={columns}
        dataSource={tableData}
        size="middle"
        scroll={{ x: 'max-content' }}
        loading={!translationTable}
        bordered
      />
    )
}