import { HolderOutlined, DeleteOutlined } from "@ant-design/icons";
import { Input } from "../inputs/Input";
import { Tag } from "../misc/Tag";

interface DraggableItemProps {
  slug: string;
  tags: string[];
  dragHandleProps?: any;
  onDelete?: () => void;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({
  slug,
  tags,
  dragHandleProps,
  onDelete
}) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-5 items-center">
        <HolderOutlined 
          {...dragHandleProps}
          className="cursor-grab active:cursor-grabbing text-lg text-neutral-400 hover:text-neutral-600" 
        />
        <Input value={slug} className="w-32" />
        <div className="flex flex-row gap-3">
          {tags.map((tag, idx) => (
            <Tag key={idx} color="blue" onDelete={() => {}}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
      <DeleteOutlined
        className="cursor-pointer text-neutral-400 hover:text-red-500 text-lg"
        onClick={onDelete}
      />
    </div>
  );
};