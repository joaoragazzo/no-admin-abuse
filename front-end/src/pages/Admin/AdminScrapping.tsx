// AdminScrapping.tsx
import { FaSpider } from "react-icons/fa";
import { PageTitle } from "./PageTitle";
import { Select } from "@/components/inputs/Select";
import { BordedCard } from "@/components/template/BordedCard";
import { ScrappingData } from "@/components/template/ScrappingData";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { GameplayTagDTO } from "@/types/scrapping/GameplayTagDTO";
import { useAdminScrappingContext } from "@/contexts/AdminScrappingContext";


const SortableItemWrapper: React.FC<{ data: GameplayTagDTO; }> = ({ data }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ScrappingData
        data={data}
        dragHandleProps={{ ...listeners, ...attributes }}
      />
    </div>
  );
};

export const AdminScrapping: React.FC = () => {
  const {gameList, gameSelected, setGameSelected, gameplayTags, setGameplayTags} = useAdminScrappingContext();

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
      setGameplayTags((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
          onChange={setGameSelected}
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
            <SortableContext items={gameplayTags.map(item => item.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {gameplayTags.map((item) => (
                  <SortableItemWrapper
                    key={item.id}
                    data={item}
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