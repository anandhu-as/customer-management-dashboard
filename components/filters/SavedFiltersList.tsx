import { Button } from "@/components/ui/button";
import { X, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import React from "react";
import { FilterCriteria } from "@/app/types";

export type SavedFilter = { id: string; name: string; criteria: FilterCriteria };

const SortableFilterItem=({
  filter,
  applySavedFilter,
  deleteSavedFilter,
}: {
  filter: SavedFilter;
  applySavedFilter: (criteria: FilterCriteria) => void;
  deleteSavedFilter: (id: string, e: React.MouseEvent) => void;
}) =>{
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: filter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between px-3 py-2 rounded-md border bg-card hover:bg-muted group transition-colors"
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:text-foreground text-muted-foreground touch-none"
        >
          <GripVertical size={16} />
        </div>
        <span
          className="text-sm font-medium cursor-pointer"
          onClick={() => applySavedFilter(filter.criteria)}
        >
          {filter.name}
        </span>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-red-500"
          onClick={(e) => deleteSavedFilter(filter.id, e)}
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}

export function SavedFiltersList({
  savedFilters,
  setSavedFilters,
  applySavedFilter,
  deleteSavedFilter,
}: {
  savedFilters: SavedFilter[];
  setSavedFilters: React.Dispatch<React.SetStateAction<SavedFilter[]>>;
  applySavedFilter: (criteria: FilterCriteria) => void;
  deleteSavedFilter: (id: string, e: React.MouseEvent) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSavedFilters((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Saved Filters</h3>
      <div className="space-y-2">
        {savedFilters.length === 0 && <p className="text-sm text-muted-foreground">No saved filters yet.</p>}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={savedFilters.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {savedFilters.map((filter) => (
              <SortableFilterItem
                key={filter.id}
                filter={filter}
                applySavedFilter={applySavedFilter}
                deleteSavedFilter={deleteSavedFilter}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
export default SavedFiltersList