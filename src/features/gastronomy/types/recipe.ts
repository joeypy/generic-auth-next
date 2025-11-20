import type { recipes } from "../db/schemas/drizzle-recipe-schema";

export type Recipe = typeof recipes.$inferSelect;
export type CreateRecipeData = typeof recipes.$inferInsert;
export type UpdateRecipeData = Partial<Omit<CreateRecipeData, "id" | "userId">>;
