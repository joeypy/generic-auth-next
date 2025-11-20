"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { useRecipeForm } from "../hooks/use-recipe-form";
import { BasicInfoSection } from "../components/recipe-form/basic-info-section";
import { RecipeDetailsSection } from "../components/recipe-form/recipe-details-section";
import { IngredientsSection } from "../components/recipe-form/ingredients-section";
import { InstructionsSection } from "../components/recipe-form/instructions-section";
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

  const {
    form,
    newTag,
    setNewTag,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    addTag,
    removeTag,
    handleSubmit: onSubmit,
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a recetas
          </Button>
          <div className="h-6 w-px bg-border"></div>
          <h1 className="text-3xl font-bold">{getTitle()}</h1>
        </div>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <BasicInfoSection form={form} />
                <RecipeDetailsSection form={form} />
                <IngredientsSection
                  form={form}
                  onAddIngredient={addIngredient}
                  onRemoveIngredient={removeIngredient}
                />
                <InstructionsSection
                  form={form}
                  onAddInstruction={addInstruction}
                  onRemoveInstruction={removeInstruction}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <ImageAndTagsSidebar
                  form={form}
                  newTag={newTag}
                  onNewTagChange={setNewTag}
                  onAddTag={addTag}
                  onRemoveTag={removeTag}
                />
                <FormActionButtons
                  mode={mode}
                  onCancel={handleCancel}
                  isSubmitting={form.formState.isSubmitting}
                />
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
