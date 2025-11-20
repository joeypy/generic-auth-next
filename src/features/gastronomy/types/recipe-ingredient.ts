import type { recipeIngredients } from "../db/schemas/drizzle-recipe-ingredient-schema";

export type RecipeIngredient = typeof recipeIngredients.$inferSelect;
export type CreateRecipeIngredientData = typeof recipeIngredients.$inferInsert;
export type UpdateRecipeIngredientData = Partial<
  Omit<CreateRecipeIngredientData, "id" | "recipeId">
>;
