"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
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
import { useRecipeForm } from "../hooks/use-recipe-form";
import { BasicInfoSection } from "../components/recipe-form/basic-info-section";
import { RecipeDetailsSection } from "../components/recipe-form/recipe-details-section";
import { IngredientsSection } from "../components/recipe-form/ingredients-section";
import { SubRecipesSection } from "../components/recipe-form/subrecipes-section";
import { SortableListInput } from "@/shared/components/sortable-list-input";
import { ImageAndTagsSidebar } from "../components/recipe-form/image-and-tags-sidebar";
import { FormActionButtons } from "../components/recipe-form/form-action-buttons";
import type { RecipeFormData } from "../schemas/recipe-form-schema";
import type { Recipe } from "../types/recipe";
import { toast } from "sonner";

interface RecipeFormPageProps {
  recipe?: Recipe | null;
  mode: "create" | "edit" | "duplicate";
}

export function RecipeFormPage({ recipe, mode }: RecipeFormPageProps) {
  const router = useRouter();
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleSubmit = async (data: RecipeFormData) => {
    // TODO: Implement API call to save recipe
    console.log("Submitting recipe:", data);
    toast.success(
      mode === "create"
        ? "Receta creada exitosamente"
        : mode === "edit"
        ? "Receta actualizada exitosamente"
        : "Receta duplicada exitosamente"
    );
    router.push("/recipes");
  };

  const handleCancel = () => {
    router.push("/recipes");
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    handleCancel();
  };

  const {
    form,
    newTag,
    setNewTag,
    addIngredient,
    removeIngredient,
    addSubrecipe,
    removeSubrecipe,
    addTag,
    removeTag,
    handleSubmit: onSubmit,
    formInstructions,
    formUtensils,
    formTips,
    instructionsToItems,
    utensilsToItems,
    tipsToItems,
    handleInstructionsChange,
    handleUtensilsChange,
    handleTipsChange,
  } = useRecipeForm({ recipe, mode, onSubmit: handleSubmit });

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Nueva Receta";
      case "edit":
        return "Editar Receta";
      case "duplicate":
        return "Duplicar Receta";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={handleCancelClick} className="gap-2">
            <ArrowLeft className="h-5 w-5" />
            Volver a recetas
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
        </div>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Single Column Layout - All cards centered */}
            <BasicInfoSection form={form} />
            <RecipeDetailsSection form={form} />
            <IngredientsSection
              form={form}
              onAddIngredient={addIngredient}
              onRemoveIngredient={removeIngredient}
            />
            {/* Instrucciones */}
            <SortableListInput
              title="Instrucciones"
              items={instructionsToItems(formInstructions())}
              onChange={handleInstructionsChange}
              placeholder="Escribe el paso de la receta..."
              addButtonText="Agregar paso"
              numbered={true}
              inputType="textarea"
              numberClassName="bg-orange-100 text-orange-700"
            />

            {/* Utensilios */}
            <SortableListInput
              title="Utensilios Necesarios"
              items={utensilsToItems()}
              onChange={handleUtensilsChange}
              placeholder="Ej: Batidora de mano, Molde para horno"
              addButtonText="Agregar utensilio"
              numbered={true}
              inputType="input"
              numberClassName="bg-blue-100 text-blue-700"
            />

            {/* Tips */}
            <SortableListInput
              title="Tips"
              items={tipsToItems()}
              onChange={handleTipsChange}
              placeholder="Escribe un tip útil..."
              addButtonText="Agregar tip"
              numbered={true}
              inputType="textarea"
              numberClassName="bg-green-100 text-green-700"
            />

            {/* Image and Tags at bottom */}
            <ImageAndTagsSidebar
              form={form}
              newTag={newTag}
              onNewTagChange={setNewTag}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />

            {/* Sub Recetas - después de las etiquetas */}
            <SubRecipesSection
              form={form}
              onAddSubrecipe={addSubrecipe}
              onRemoveSubrecipe={removeSubrecipe}
              currentRecipeId={recipe?.id}
            />

            {/* Action buttons at the very bottom */}
            <FormActionButtons
              mode={mode}
              onCancel={handleCancel}
              isSubmitting={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {mode === "create"
                ? "Si cancelas, se perderán todos los datos ingresados. ¿Deseas continuar?"
                : mode === "edit"
                ? "Si cancelas, se perderán todos los cambios realizados. ¿Deseas continuar?"
                : "Si cancelas, se perderán todos los datos de la copia. ¿Deseas continuar?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continuar editando</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
