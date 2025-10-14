import { HolderOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "../inputs/Input";
import { Tag } from "../misc/Tag";
import type { GameplayTagAliasDTO } from "@/types/scrapping/GameplayTagAliasDTO";

interface DraggableItemProps {
  slug: string;
  aliases: GameplayTagAliasDTO[];
  dragHandleProps?: any;
  onDelete?: () => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  slug,
  aliases,
  dragHandleProps,
  onDelete
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-5 items-center flex-1 min-w-0">
        <HolderOutlined
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-lg text-neutral-400 hover:text-neutral-600"
        />
        <Input value={slug} className="w-32 flex-shrink-0 pb-2" />
        <div className="flex flex-row gap-3 overflow-x-auto flex-1 min-w-0 pb-2 mr-4">
          {aliases.map((alias, idx) => (
            <Tag key={idx} color="blue" onDelete={() => {}} className="flex-shrink-0">
              {alias.alias}
            </Tag>
          ))}
        </div>
      </div>
      <DeleteOutlined
        className="cursor-pointer hover:bg-neutral-700 p-2 rounded-full text-neutral-400 hover:text-red-500 text-lg flex-shrink-0"
        onClick={onDelete}
      />
    </div>
  );
};