import type { recipeBudgets } from "../db/schemas/drizzle-recipe-budget-schema";

export type RecipeBudget = typeof recipeBudgets.$inferSelect;
export type CreateRecipeBudgetData = typeof recipeBudgets.$inferInsert;
export type UpdateRecipeBudgetData = Partial<
  Omit<CreateRecipeBudgetData, "id" | "userId" | "recipeId">
>;
