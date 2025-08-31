import { FaAngleRight } from "react-icons/fa"
import type { IconType } from "react-icons/lib"

interface AdminSectionButton {
  title: string,
  description: string,
  details?: string,
  Icon: IconType
  onClick?: () => void
}

export const AdminSectionButton: React.FC<AdminSectionButton> = ({ title, description, Icon, details, onClick}) => {
    return (
      <div 
        className="bg-neutral-900/60 px-6 py-5 rounded-xl gap-3 flex flex-col cursor-pointer hover:scale-102 transition-all"
        onClick={onClick}
      >
        <div className="flex flex-row gap-3 items-center">
          <div className="bg-black p-3 rounded-md aspect-square flex h-15 justify-center items-center">
            <Icon className="text-2xl"/>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-bold">
              {title}
            </div>
            <div className="text-slate-200">
              {description}
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-300 text-beautify">
          {details}
        </div>
        <div className="flex justify-end w-full items-center gap-1 text-sm mt-auto text-gray-300">
          Mais opções <FaAngleRight />
        </div>
      </div>
    )
  }