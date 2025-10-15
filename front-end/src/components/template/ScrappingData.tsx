import { HolderOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "../inputs/Input";
import { Tag } from "../misc/Tag";
import { FaPlus } from "react-icons/fa";
import type { GameplayTagDTO } from "@/types/scrapping/GameplayTagDTO";
import { useAdminScrappingContext } from "@/contexts/AdminScrappingContext";

interface ScrappingDataProps {
  data: GameplayTagDTO
  dragHandleProps?: any;
}

export const ScrappingData: React.FC<ScrappingDataProps> = ({
  data,
  dragHandleProps,
}) => {

  const {handleDeleteGameplayTag, handleDeleteGameplayTagAlias} = useAdminScrappingContext();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-5 items-center flex-1 min-w-0">
        <HolderOutlined
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-lg text-neutral-400 hover:text-neutral-600"
        />
        <Input value={data.slug} className="w-32 flex-shrink-0 pb-2" />
        <div className="flex flex-row gap-3 overflow-x-auto flex-1 min-w-0 pb-2 mr-4">
          {data.aliases.map((alias, idx) => (
            <Tag key={idx} color="blue" onDelete={() => {handleDeleteGameplayTagAlias(data.id, alias.id)}} className="flex-shrink-0">
              {alias.alias}
            </Tag>
          ))}
          <Tag color="outlined"><FaPlus /></Tag>
        </div>
      </div>
      <DeleteOutlined
        className="cursor-pointer hover:bg-neutral-700 p-2 rounded-full text-neutral-400 hover:text-red-500 text-lg flex-shrink-0"
        onClick={() => {handleDeleteGameplayTag(data.id)}}
      />
    </div>
  );
};