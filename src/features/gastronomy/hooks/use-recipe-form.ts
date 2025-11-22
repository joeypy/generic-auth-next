"use client";

import { useState } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recipeFormSchema,
  type RecipeFormData,
} from "../schemas/recipe-form-schema";
import type { Recipe } from "../types/recipe";

interface UseRecipeFormProps {
  recipe?: Recipe | null;
  mode: "create" | "edit" | "duplicate";
  onSubmit: (data: RecipeFormData) => void;
}

export function useRecipeForm({ recipe, mode, onSubmit }: UseRecipeFormProps) {
  const getDefaultValues = (): Partial<RecipeFormData> => {
    if (!recipe || mode === "create") {
      return {
        name: "",
        description: "",
        imageUrl: "",
        prepTime: 0,
        cookTime: 0,
        servings: 4,
        difficulty: "easy",
        category: "",
        isSubrecipe: false,
        tags: [],
        utensils: [""],
        tips: [""],
        subrecipes: [],
        ingredients: [
          { name: "", quantity: 0, unitId: "", notes: "", sortOrder: 0 },
        ],
        instructions: [{ stepNumber: 1, instruction: "" }],
      };
    }

    const baseName =
      mode === "duplicate" ? `${recipe.name} (Copia)` : recipe.name;

    // Validar difficulty para que sea uno de los valores permitidos
    const validDifficulty =
      recipe.difficulty === "easy" ||
      recipe.difficulty === "medium" ||
      recipe.difficulty === "hard"
        ? recipe.difficulty
        : "easy";

    return {
      name: baseName,
      description: recipe.description || "",
      imageUrl: recipe.imageUrl || "",
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 4,
      difficulty: validDifficulty,
      category: recipe.category || "",
      isSubrecipe: recipe.isSubrecipe || false,
      tags: recipe.tags || [],
      // utensils y tips no existen en el schema de la BD, se inicializan vacíos
      utensils: [""],
      tips: [""],
      subrecipes: [],
      ingredients: [
        { name: "", quantity: 0, unitId: "", notes: "", sortOrder: 0 },
      ],
      instructions: [{ stepNumber: 1, instruction: "" }],
    };
  };

  const form: UseFormReturn<RecipeFormData> = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: getDefaultValues() as RecipeFormData,
  });

  const [newTag, setNewTag] = useState("");

  const addIngredient = () => {
    const currentIngredients = form.getValues("ingredients") || [];
    form.setValue("ingredients", [
      ...currentIngredients,
      {
        name: "",
        quantity: 0,
        unitId: "",
        notes: "",
        sortOrder: currentIngredients.length,
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients") || [];
    if (currentIngredients.length > 1) {
      form.setValue(
        "ingredients",
        currentIngredients.filter((_, i) => i !== index)
      );
    }
  };

  const addInstruction = () => {
    const currentInstructions = form.getValues("instructions") || [];
    form.setValue("instructions", [
      ...currentInstructions,
      {
        stepNumber: currentInstructions.length + 1,
        instruction: "",
      },
    ]);
  };

  const removeInstruction = (index: number) => {
    const currentInstructions = form.getValues("instructions") || [];
    if (currentInstructions.length > 1) {
      const updatedInstructions = currentInstructions
        .filter((_, i) => i !== index)
        .map((inst, i) => ({ ...inst, stepNumber: i + 1 }));
      form.setValue("instructions", updatedInstructions);
    }
  };

  const addTag = () => {
    if (newTag.trim()) {
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(newTag.trim())) {
        form.setValue("tags", [...currentTags, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag)
    );
  };

  const addSubrecipe = (subrecipeId: string) => {
    const currentSubrecipes = form.getValues("subrecipes") || [];
    // Verificar que no esté ya agregada
    if (currentSubrecipes.some((sr) => sr.subrecipeId === subrecipeId)) {
      return;
    }
    form.setValue("subrecipes", [
      ...currentSubrecipes,
      {
        subrecipeId,
        quantity: undefined,
        unitId: undefined,
        notes: undefined,
        sortOrder: currentSubrecipes.length,
      },
    ]);
  };

  const removeSubrecipe = (index: number) => {
    const currentSubrecipes = form.getValues("subrecipes") || [];
    form.setValue(
      "subrecipes",
      currentSubrecipes.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = form.handleSubmit((data: RecipeFormData) => {
    onSubmit(data);
  });

  // Helper functions para obtener valores del formulario con defaults
  const getFormValue = <T extends keyof RecipeFormData>(
    field: T,
    defaultValue: RecipeFormData[T]
  ): RecipeFormData[T] => {
    const value = form.watch(field);
    if (Array.isArray(value)) {
      return (value.length > 0 ? value : defaultValue) as RecipeFormData[T];
    }
    return (value ?? defaultValue) as RecipeFormData[T];
  };

  const formInstructions = () => {
    return getFormValue("instructions", [
      { stepNumber: 1, instruction: "" },
    ]) as Array<{ stepNumber: number; instruction: string }>;
  };

  const formUtensils = () => {
    return getFormValue("utensils", [""]) as string[];
  };

  const formTips = () => {
    return getFormValue("tips", [""]) as string[];
  };

  // Funciones genéricas para convertir entre formatos
  const stringArrayToItems = (arr: string[], prefix: string) => {
    return arr.map((item, index) => ({
      id: `${prefix}-${index}`,
      text: item,
    }));
  };

  const itemsToStringArray = (items: Array<{ id: string; text: string }>) => {
    const result = items.map((item) => item.text);
    return result.length === 0 ? [""] : result;
  };

  const instructionsToItems = (
    instructions: Array<{ stepNumber: number; instruction: string }>
  ) => {
    return instructions.map((inst, index) => ({
      id: `instruction-${index}`,
      text: inst.instruction,
    }));
  };

  const itemsToInstructions = (items: Array<{ id: string; text: string }>) => {
    const instructions = items.map((item, index) => ({
      stepNumber: index + 1,
      instruction: item.text,
    }));
    return instructions.length === 0
      ? [{ stepNumber: 1, instruction: "" }]
      : instructions;
  };

  // Handlers para onChange de cada sección
  const handleInstructionsChange = (
    items: Array<{ id: string; text: string }>
  ) => {
    form.setValue("instructions", itemsToInstructions(items));
  };

  const handleUtensilsChange = (items: Array<{ id: string; text: string }>) => {
    form.setValue("utensils", itemsToStringArray(items));
  };

  const handleTipsChange = (items: Array<{ id: string; text: string }>) => {
    form.setValue("tips", itemsToStringArray(items));
  };

  return {
    form,
    newTag,
    setNewTag,
    addIngredient,
    removeIngredient,
    addSubrecipe,
    removeSubrecipe,
    addTag,
    removeTag,
    handleSubmit,
    // Valores del formulario
    formInstructions,
    formUtensils,
    formTips,
    // Conversiones
    instructionsToItems,
    utensilsToItems: () => stringArrayToItems(formUtensils(), "utensil"),
    tipsToItems: () => stringArrayToItems(formTips(), "tip"),
    // Handlers
    handleInstructionsChange,
    handleUtensilsChange,
    handleTipsChange,
  };
}
