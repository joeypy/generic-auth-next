"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeFormSchema, type RecipeFormData } from "../schemas/recipe-form-schema";
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
        ingredients: [
          { name: "", quantity: 0, unitId: "", notes: "", sortOrder: 0 },
        ],
        instructions: [{ stepNumber: 1, instruction: "" }],
      };
    }

    const baseName = mode === "duplicate" ? `${recipe.name} (Copia)` : recipe.name;

    return {
      name: baseName,
      description: recipe.description || "",
      imageUrl: recipe.imageUrl || "",
      prepTime: recipe.prepTime || 0,
      cookTime: recipe.cookTime || 0,
      servings: recipe.servings || 4,
      difficulty: recipe.difficulty || "easy",
      category: recipe.category || "",
      isSubrecipe: recipe.isSubrecipe || false,
      tags: recipe.tags || [],
      ingredients: [
        { name: "", quantity: 0, unitId: "", notes: "", sortOrder: 0 },
      ],
      instructions: [{ stepNumber: 1, instruction: "" }],
    };
  };

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: getDefaultValues(),
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

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return {
    form,
    newTag,
    setNewTag,
    addIngredient,
    removeIngredient,
    addInstruction,
    removeInstruction,
    addTag,
    removeTag,
    handleSubmit,
  };
}
