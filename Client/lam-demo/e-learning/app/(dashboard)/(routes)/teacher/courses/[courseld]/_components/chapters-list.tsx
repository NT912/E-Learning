"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import { Grip, Pencil, BadgeCheck, BadgeMinus } from "lucide-react";

export interface Chapter {
  ChapterID: number;
  Title: string;
  OrderNumber: number;
  Description: string;
  isPublished?: boolean;
  isFree?: boolean;
}

interface ChaptersListProps {
  items: Chapter[];
  onReorder?: (updateData: { id: number; position: number }[]) => void;
  onEdit: (id: number) => void;
}

export const ChaptersList = ({ items, onReorder, onEdit }: ChaptersListProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  // Initialize chapters on mount
  useEffect(() => {
    setChapters(items);
  }, [items]);

  // Handle drag-and-drop reorder logic
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedChapters = Array.from(chapters);
    const [movedItem] = updatedChapters.splice(result.source.index, 1);
    updatedChapters.splice(result.destination.index, 0, movedItem);

    setChapters(updatedChapters);

    const bulkUpdateData = updatedChapters.map((chapter, index) => ({
      id: chapter.ChapterID,
      position: index,
    }));

    // onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.ChapterID}
                draggableId={chapter.ChapterID.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={cn(
                      "flex items-center justify-between gap-x-4 p-4 bg-white border rounded-md shadow hover:shadow-md transition mb-2",
                      chapter.isPublished && "border-green-400 bg-green-50"
                    )}
                  >
                    {/* Drag Handle */}
                    <div
                      {...provided.dragHandleProps}
                      className="cursor-grab text-slate-400 hover:text-slate-600 transition"
                    >
                      <Grip className="w-5 h-5" />
                    </div>

                    {/* Chapter Title & Description */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-800">
                        {chapter.Title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {chapter.Description}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-x-2">
                      {chapter.isFree && (
                        <div className="flex items-center gap-x-1 text-blue-600">
                          <BadgeCheck className="w-4 h-4" />
                          <span className="text-xs">Free</span>
                        </div>
                      )}
                      {chapter.isPublished ? (
                        <div className="flex items-center gap-x-1 text-green-600">
                          <BadgeCheck className="w-4 h-4" />
                          <span className="text-xs">Published</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-x-1 text-yellow-600">
                          <BadgeMinus className="w-4 h-4" />
                          <span className="text-xs">Draft</span>
                        </div>
                      )}
                    </div>

                    {/* Edit Button */}
                    <Pencil
                      className="w-5 h-5 text-slate-500 hover:text-slate-700 cursor-pointer"
                      onClick={() => onEdit(chapter.ChapterID)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
