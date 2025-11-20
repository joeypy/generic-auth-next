import type { recipeInstructions } from "../db/schemas/drizzle-recipe-instruction-schema";

export type RecipeInstruction = typeof recipeInstructions.$inferSelect;
export type CreateRecipeInstructionData = typeof recipeInstructions.$inferInsert;
export type UpdateRecipeInstructionData = Partial<
  Omit<CreateRecipeInstructionData, "id" | "recipeId">
>;
