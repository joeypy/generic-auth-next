"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { ReusableTable } from "@/shared/components/reusable-table";
import type { Recipe } from "../../types/recipe";

interface RecipeWithDetails extends Recipe {
  ingredients?: Array<{
    ingredientName: string;
    quantity: number;
    unitId: string;
    notes?: string | null;
  }>;
  instructions?: Array<{
    stepNumber: number;
    instruction: string;
  }>;
  utensils?: string[];
  tips?: string[];
}

interface SubrecipeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: RecipeWithDetails | null;
}

export function SubrecipeDetailModal({
  open,
  onOpenChange,
  recipe,
}: SubrecipeDetailModalProps) {
  if (!recipe) {
    return null;
  }

  const getDifficultyLabel = (diff: string | null) => {
    if (!diff) return "No especificada";
    switch (diff) {
      case "easy":
        return "Fácil";
      case "medium":
        return "Intermedio";
      case "hard":
        return "Difícil";
      default:
        return diff;
    }
  };

  const validUtensils = recipe.utensils?.filter((u) => u.trim() !== "") || [];
  const validTips = recipe.tips?.filter((t) => t.trim() !== "") || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Información Básica */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Información Básica</h3>
            <div className="space-y-1">
              {recipe.description && (
                <p>
                  <span className="font-medium">Descripción:</span>{" "}
                  {recipe.description}
                </p>
              )}
              {recipe.category && (
                <p>
                  <span className="font-medium">Categoría:</span>{" "}
                  {recipe.category}
                </p>
              )}
            </div>
          </div>

          {/* Detalles */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Detalles</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recipe.prepTime && recipe.prepTime > 0 && (
                <p>
                  <span className="font-medium">Prep:</span> {recipe.prepTime}{" "}
                  min
                </p>
              )}
              {recipe.cookTime && recipe.cookTime > 0 && (
                <p>
                  <span className="font-medium">Cocción:</span>{" "}
                  {recipe.cookTime} min
                </p>
              )}
              {recipe.servings && recipe.servings > 0 && (
                <p>
                  <span className="font-medium">Porciones:</span>{" "}
                  {recipe.servings}
                </p>
              )}
              <p>
                <span className="font-medium">Dificultad:</span>{" "}
                {getDifficultyLabel(recipe.difficulty)}
              </p>
            </div>
          </div>

          {/* Ingredientes */}
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Ingredientes</h3>
              <ReusableTable
                type="ingredients"
                data={recipe.ingredients.map((ing) => ({
                  name: ing.ingredientName,
                  quantity: Number(ing.quantity),
                  unitId: ing.unitId,
                  notes: ing.notes || undefined,
                }))}
              />
            </div>
          )}

          {/* Instrucciones */}
          {recipe.instructions && recipe.instructions.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Instrucciones</h3>
              <ReusableTable
                type="instructions"
                data={recipe.instructions.map((inst) => ({
                  stepNumber: inst.stepNumber,
                  instruction: inst.instruction,
                }))}
              />
            </div>
          )}

          {/* Utensilios */}
          {validUtensils.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Utensilios</h3>
              <ReusableTable
                type="utensils"
                data={validUtensils.map((utensil) => ({ name: utensil }))}
              />
            </div>
          )}

          {/* Tips */}
          {validTips.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Tips</h3>
              <ReusableTable
                type="tips"
                data={validTips.map((tip) => ({ text: tip }))}
              />
            </div>
          )}

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

