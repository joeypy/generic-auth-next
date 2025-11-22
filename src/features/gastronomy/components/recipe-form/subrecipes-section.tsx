"use client";

import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import type { RecipeFormData } from "../../schemas/recipe-form-schema";
import type { Recipe } from "../../types/recipe";
import { useRecipes } from "../../hooks/use-recipes";
import { useState, useEffect } from "react";
import { Separator } from "@/shared/components/ui/separator";

interface SubRecipesSectionProps {
  form: UseFormReturn<RecipeFormData>;
  onAddSubrecipe: (subrecipeId: string) => void;
  onRemoveSubrecipe: (index: number) => void;
  currentRecipeId?: string | null;
}

interface RecipeWithIngredients extends Recipe {
  ingredients?: Array<{
    ingredientName: string;
    quantity: number;
    unitId: string;
    notes?: string | null;
  }>;
}

export function SubRecipesSection({
  form,
  onAddSubrecipe,
  onRemoveSubrecipe,
  currentRecipeId,
}: SubRecipesSectionProps) {
  const subrecipes = form.watch("subrecipes") || [];
  const { recipes, isLoading } = useRecipes();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");
  const [subrecipeDetails, setSubrecipeDetails] = useState<
    Map<string, RecipeWithIngredients>
  >(new Map());

  // Obtener datos de la receta principal del formulario
  const mainRecipeName = form.watch("name") || "Receta sin nombre";
  const mainRecipeDescription = form.watch("description") || "";
  const mainRecipeIngredients = form.watch("ingredients") || [];

  // Filtrar recetas disponibles (excluir la receta actual)
  const availableRecipes = recipes.filter(
    (recipe) => recipe.id !== currentRecipeId
  );

  // Obtener IDs de sub recetas ya seleccionadas
  const selectedSubrecipeIds = subrecipes.map((sr) => sr.subrecipeId);

  // Filtrar recetas que ya están seleccionadas
  const selectableRecipes = availableRecipes.filter(
    (recipe) => !selectedSubrecipeIds.includes(recipe.id)
  );

  // Cargar detalles de las sub recetas seleccionadas
  useEffect(() => {
    const loadSubrecipeDetails = async () => {
      console.log("Cargando detalles de sub recetas:", subrecipes);
      const newDetails = new Map<string, RecipeWithIngredients>();

      for (const subrecipe of subrecipes) {
        if (subrecipe.subrecipeId && !subrecipeDetails.has(subrecipe.subrecipeId)) {
          const recipe = recipes.find((r) => r.id === subrecipe.subrecipeId);
          console.log("Receta encontrada para sub receta:", recipe);
          if (recipe) {
            // TODO: Cargar ingredientes de la receta desde la API
            // Por ahora usamos los datos básicos de la receta
            newDetails.set(subrecipe.subrecipeId, {
              ...recipe,
              ingredients: [], // Se cargará desde la API cuando esté disponible
            });
          }
        } else if (subrecipe.subrecipeId) {
          // Ya tenemos los detalles, mantenerlos
          const existing = subrecipeDetails.get(subrecipe.subrecipeId);
          if (existing) {
            newDetails.set(subrecipe.subrecipeId, existing);
          }
        }
      }

      if (newDetails.size > 0) {
        console.log("Nuevos detalles de sub recetas cargados:", newDetails);
        setSubrecipeDetails((prev) => new Map([...prev, ...newDetails]));
      }
    };

    loadSubrecipeDetails();
  }, [subrecipes, recipes, subrecipeDetails]);

  const handleAddSubrecipe = () => {
    if (selectedRecipeId) {
      console.log("Agregando sub receta:", selectedRecipeId);
      onAddSubrecipe(selectedRecipeId);
      setSelectedRecipeId("");
      console.log("Sub receta agregada exitosamente");
    }
  };

  const getSubrecipeDetails = (subrecipeId: string): RecipeWithIngredients | null => {
    return subrecipeDetails.get(subrecipeId) || null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Receta Completa</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Seleccionar sub receta" />
              </SelectTrigger>
              <SelectContent>
                {selectableRecipes.map((recipe) => (
                  <SelectItem key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddSubrecipe}
              size="sm"
              disabled={!selectedRecipeId || selectableRecipes.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Receta Principal */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Receta principal:</h3>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <h4 className="font-medium text-base">{mainRecipeName}</h4>
                {mainRecipeDescription && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {mainRecipeDescription}
                  </p>
                )}
              </div>
              {mainRecipeIngredients.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium mb-2">Ingredientes:</h5>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Cantidad</TableHead>
                        <TableHead>Ingrediente</TableHead>
                        <TableHead className="w-[150px]">Notas</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mainRecipeIngredients.map((ingredient, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {ingredient.quantity} {ingredient.unitId || ""}
                          </TableCell>
                          <TableCell className="font-medium">
                            {ingredient.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {ingredient.notes || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sub Recetas */}
        {subrecipes.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Sub-recetas:</h3>
            {subrecipes.map((subrecipe, index) => {
              const subrecipeData = getSubrecipeDetails(subrecipe.subrecipeId);
              const isLast = index === subrecipes.length - 1;

              return (
                <div key={index} className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-base">
                          {subrecipeData?.name || "Cargando..."}
                        </h4>
                        {subrecipeData?.description && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {subrecipeData.description}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveSubrecipe(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {subrecipeData?.ingredients &&
                      subrecipeData.ingredients.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium mb-2">Ingredientes:</h5>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[100px]">Cantidad</TableHead>
                                <TableHead>Ingrediente</TableHead>
                                <TableHead className="w-[150px]">Notas</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {subrecipeData.ingredients.map((ingredient, ingIndex) => (
                                <TableRow key={ingIndex}>
                                  <TableCell>
                                    {ingredient.quantity} {ingredient.unitId || ""}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {ingredient.ingredientName}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">
                                    {ingredient.notes || "-"}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    {(!subrecipeData?.ingredients ||
                      subrecipeData.ingredients.length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        No hay ingredientes disponibles para esta sub receta.
                      </p>
                    )}
                  </div>
                  {!isLast && <Separator className="my-4" />}
                </div>
              );
            })}
          </div>
        )}

        {subrecipes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No hay sub recetas agregadas. Selecciona una receta y presiona "Agregar"
            para incluirla.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
