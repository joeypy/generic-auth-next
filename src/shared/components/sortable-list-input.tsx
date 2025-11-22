"use client";

import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { useState } from "react";

interface TextListItem {
  id: string;
  text: string;
}

interface TextListInputProps {
  title: string;
  items: TextListItem[];
  onChange: (items: TextListItem[]) => void;
  placeholder?: string;
  addButtonText?: string;
  numbered?: boolean;
  inputType?: "input" | "textarea";
  numberClassName?: string;
  confirmWhenDeleted?: boolean;
}

function SortableTextItem({
  item,
  index,
  onUpdate,
  onRemove,
  numbered,
  inputType,
  placeholder,
  numberClassName = "bg-orange-100 text-orange-700",
  canRemove,
}: {
  item: TextListItem;
  index: number;
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  numbered: boolean;
  inputType: "input" | "textarea";
  placeholder?: string;
  numberClassName?: string;
  canRemove: boolean;
}) {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    isDragging 
  } = useSortable({ 
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start space-x-4 ${
        isDragging ? 'z-50 shadow-lg bg-white rounded-lg p-2' : ''
      }`}
    >
      <div
        className="cursor-grab active:cursor-grabbing mt-2"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      {numbered && (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium mt-2 flex-shrink-0 ${numberClassName}`}
        >
          {index + 1}
        </span>
      )}
      {inputType === "textarea" ? (
        <Textarea
          value={item.text}
          onChange={(e) => onUpdate(item.id, e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="flex-1"
        />
      ) : (
        <Input
          value={item.text}
          onChange={(e) => onUpdate(item.id, e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
      )}
      {canRemove && (
        <Button
          type="button"
          onClick={() => onRemove(item.id)}
          variant="ghost"
          size="icon"
          className="mt-2"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      )}
    </div>
  );
}

export function SortableListInput({
  title,
  items,
  onChange,
  placeholder = "Ingrese el texto",
  addButtonText = "Agregar",
  numbered = true,
  inputType = "textarea",
  numberClassName = "bg-orange-100 text-orange-700",
  confirmWhenDeleted = false,
}: TextListInputProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    onChange([...items, { id: Date.now().toString(), text: "" }]);
  };

  const handleUpdate = (id: string, text: string) => {
    onChange(
      items.map((item) => (item.id === id ? { ...item, text } : item))
    );
  };

  const handleRemove = (id: string) => {
    if (confirmWhenDeleted) {
      setItemToDelete(id);
      setDeleteDialogOpen(true);
    } else {
      // Siempre mantener al menos un item, si es el último solo limpiarlo
      if (items.length > 1) {
        onChange(items.filter((item) => item.id !== id));
      } else {
        // Si es el último, solo limpiar el texto
        onChange([{ id: items[0].id, text: "" }]);
      }
    }
  };

  const confirmRemove = () => {
    if (itemToDelete) {
      // Siempre mantener al menos un item, si es el último solo limpiarlo
      if (items.length > 1) {
        onChange(items.filter((item) => item.id !== itemToDelete));
      } else {
        // Si es el último, solo limpiar el texto
        onChange([{ id: items[0].id, text: "" }]);
      }
      setItemToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button type="button" onClick={handleAdd} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {addButtonText}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {items.map((item, index) => (
                  <SortableTextItem
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    numbered={numbered}
                    inputType={inputType}
                    placeholder={placeholder}
                    numberClassName={numberClassName}
                    canRemove={items.length > 1}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      {confirmWhenDeleted && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará el elemento. Esta acción no se puede deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmRemove}
                className="bg-red-500 hover:bg-red-600"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}