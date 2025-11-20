import type { recipeSubrecipes } from "../db/schemas/drizzle-recipe-subrecipe-schema";

export type RecipeSubrecipe = typeof recipeSubrecipes.$inferSelect;
export type CreateRecipeSubrecipeData = typeof recipeSubrecipes.$inferInsert;
export type UpdateRecipeSubrecipeData = Partial<
  Omit<CreateRecipeSubrecipeData, "id" | "parentRecipeId">
>;
