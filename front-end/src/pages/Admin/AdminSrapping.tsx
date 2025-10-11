// AdminScrapping.tsx
import { FaSpider } from "react-icons/fa";
import { PageTitle } from "./PageTitle";
import { Select } from "@/components/inputs/Select";
import { useEffect, useState } from "react";
import GameService from "@/services/GameService";
import type { Option } from "@/types/Option";
import { BordedCard } from "@/components/template/BordedCard";
import { DraggableItem } from "@/components/template/DraggableItem";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface GameplayTag {
  id: string;
  slug: string;
  tags: string[];
}

const SortableItemWrapper: React.FC<{ item: GameplayTag; onDelete: (id: string) => void }> = ({ item, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DraggableItem
        slug={item.slug}
        tags={item.tags}
        dragHandleProps={{ ...listeners, ...attributes }}
        onDelete={() => onDelete(item.id)}
      />
    </div>
  );
};

export const AdminScrapping: React.FC = () => {
  const [gameList, setGameList] = useState<Option[]>([]);
  const [gameSelected, setGameSelected] = useState<string>();
  const [items, setItems] = useState<GameplayTag[]>([
    {
      id: '1',
      slug: 'vanilla',
      tags: ['vanila', 'van', 'vanilla', 'no-mods', 'no mods']
    },
    {
      id: '2',
      slug: 'vanillap',
      tags: ['vanilla+', 'vanilla +', 'vanila+', 'vanillap', 'vanilap']
    },
    {
      id: '3',
      slug: 'modded',
      tags: ['mods', 'modded', 'with mods']
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  useEffect(() => {
    GameService.fetchAllGamesOption().then(res => {
      setGameList(res);
      setGameSelected(res[0].value);
    });
  }, [])

  return (
    <>
      <PageTitle
        main="Administração e gestão de"
        emphasis="scrapping de Servidores"
        description="Gerencie e monitore o scrapping de servidores de jogos para garantir dados atualizados e precisos."
        Icon={FaSpider}
      />
      <div className="mb-10 flex flex-row gap-3 text-sm items-center text-neutral-400">
        Selecione o jogo:
        <Select
          options={gameList}
          value={gameSelected}
          placeholder="Selecione o jogo"
          className="w-50"
        />
      </div>
      <div>
        <BordedCard title="Tags de Gameplay">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <SortableItemWrapper
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </BordedCard>
      </div>
    </>
  );
}