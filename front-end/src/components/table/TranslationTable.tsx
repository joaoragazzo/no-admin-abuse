import type React from "react"
import { LanguageEditInput } from "../inputs/LanguageEditInput"
import type { TranslationTableDTO } from "@/interfaces/TranslationTableDTO"

interface TranslationTableProps {
    data: TranslationTableDTO
}

export const TranslationTable: React.FC<TranslationTableProps> = ({ data }) => {
    return (
        <table className="table-auto border-collapse min-w-full text-sm">
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 bg-black  px-4 py-2 text-left font-bold uppercase z-20"
              >
                Chave
              </th>
              {data.langs.map((lang) => (
                <th
                  key={lang}
                  scope="col"
                  className={`px-4 py-2 text-left font-bold uppercase whitespace-nowrap`}
                >
                  {lang}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.content.map((translation) => (
              <tr key={translation.key} className="border-t border-slate-200">
                <td className="sticky left-0 bg-black border-slate-200 px-4 py-2 font-mono font-semibold z-10">
                  {translation.key}
                </td>
                {data.langs.map((lang) => (
                  <td
                    key={lang}
                    className={`px-4 py-2 whitespace-nowrap`}
                  >
                    <LanguageEditInput translation={translation.translations[lang]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
    )
}