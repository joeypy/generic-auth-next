import { z } from "zod";

export const recipeFormSchema = z.object({
  name: z.string().min(1, "El nombre de la receta es obligatorio"),
  description: z.string().optional(),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  prepTime: z.number().min(0, "El tiempo debe ser positivo").optional(),
  cookTime: z.number().min(0, "El tiempo debe ser positivo").optional(),
  servings: z.number().min(1, "Debe ser al menos 1 porción"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  category: z.string().optional(),
  isSubrecipe: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "El nombre es requerido"),
        quantity: z.number().min(0, "La cantidad debe ser positiva"),
        unitId: z.string().optional(),
        notes: z.string().optional(),
        sortOrder: z.number().default(0),
      })
    )
    .min(1, "Debe agregar al menos un ingrediente"),
  instructions: z
    .array(
      z.object({
        stepNumber: z.number(),
        instruction: z.string().min(1, "La instrucción no puede estar vacía"),
      })
    )
    .min(1, "Debe agregar al menos una instrucción"),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;
