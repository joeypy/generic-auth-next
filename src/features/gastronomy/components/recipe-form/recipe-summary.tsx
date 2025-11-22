"use client";

import { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ReusableTable } from "@/shared/components/reusable-table";
import type { RecipeFormData } from "../../schemas/recipe-form-schema";

interface RecipeSummaryProps {
  form: UseFormReturn<RecipeFormData>;
}

export function RecipeSummary({ form }: RecipeSummaryProps) {
  const name = form.watch("name") || "Receta sin nombre";
  const description = form.watch("description") || "";
  const category = form.watch("category") || "";
  const prepTime = form.watch("prepTime") || 0;
  const cookTime = form.watch("cookTime") || 0;
  const servings = form.watch("servings") || 0;
  const difficulty = form.watch("difficulty") || "easy";
  const ingredients = form.watch("ingredients") || [];
  const instructions = form.watch("instructions") || [];
  const utensils = form.watch("utensils") || [];
  const tips = form.watch("tips") || [];
  const tags = form.watch("tags") || [];

  const getDifficultyLabel = (diff: string) => {
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

  // Filtrar utensilios y tips vacíos
  const validUtensils = utensils.filter((u) => u.trim() !== "");
  const validTips = tips.filter((t) => t.trim() !== "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la Receta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Información Básica */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Información Básica</h3>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Nombre:</span> {name}
            </p>
            {description && (
              <p>
                <span className="font-medium">Descripción:</span> {description}
              </p>
            )}
            {category && (
              <p>
                <span className="font-medium">Categoría:</span> {category}
              </p>
            )}
          </div>
        </div>

        {/* Detalles */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Detalles</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {prepTime > 0 && (
              <p>
                <span className="font-medium">Prep:</span> {prepTime} min
              </p>
            )}
            {cookTime > 0 && (
              <p>
                <span className="font-medium">Cocción:</span> {cookTime} min
              </p>
            )}
            {servings > 0 && (
              <p>
                <span className="font-medium">Porciones:</span> {servings}
              </p>
            )}
            <p>
              <span className="font-medium">Dificultad:</span>{" "}
              {getDifficultyLabel(difficulty)}
            </p>
          </div>
        </div>

        {/* Ingredientes */}
        {ingredients.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Ingredientes</h3>
            <ReusableTable
              type="ingredients"
              data={ingredients.map((ing) => ({
                name: ing.name,
                quantity: ing.quantity,
                unitId: ing.unitId,
                notes: ing.notes,
              }))}
            />
          </div>
        )}

        {/* Instrucciones */}
        {instructions.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Instrucciones</h3>
            <ReusableTable
              type="instructions"
              data={instructions.map((inst) => ({
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
        {tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
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
      </CardContent>
    </Card>
  );
}

