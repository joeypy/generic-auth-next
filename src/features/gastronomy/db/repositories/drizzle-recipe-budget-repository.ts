import { eq, and, desc } from "drizzle-orm";
import { recipeBudgets } from "../schemas/drizzle-recipe-budget-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  RecipeBudget,
  CreateRecipeBudgetData,
  UpdateRecipeBudgetData,
} from "../../types/recipe-budget";

export class RecipeBudgetRepository extends BaseRepository<RecipeBudget> {
  async create(data: CreateRecipeBudgetData): Promise<RecipeBudget> {
    const [newBudget] = await this.db
      .insert(recipeBudgets)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newBudget as RecipeBudget;
  }

  async findById(id: string): Promise<RecipeBudget | null> {
    const [budget] = await this.db
      .select()
      .from(recipeBudgets)
      .where(eq(recipeBudgets.id, id));

    return (budget as RecipeBudget) || null;
  }

  async findByRecipeId(recipeId: string): Promise<RecipeBudget[]> {
    const budgets = await this.db
      .select()
      .from(recipeBudgets)
      .where(eq(recipeBudgets.recipeId, recipeId))
      .orderBy(desc(recipeBudgets.budgetDate));

    return budgets as RecipeBudget[];
  }

  async findByUserId(userId: string): Promise<RecipeBudget[]> {
    const budgets = await this.db
      .select()
      .from(recipeBudgets)
      .where(eq(recipeBudgets.userId, userId))
      .orderBy(desc(recipeBudgets.budgetDate));

    return budgets as RecipeBudget[];
  }

  async findByStatus(
    userId: string,
    status: string
  ): Promise<RecipeBudget[]> {
    const budgets = await this.db
      .select()
      .from(recipeBudgets)
      .where(and(eq(recipeBudgets.userId, userId), eq(recipeBudgets.status, status)))
      .orderBy(desc(recipeBudgets.budgetDate));

    return budgets as RecipeBudget[];
  }

  async update(
    id: string,
    data: UpdateRecipeBudgetData
  ): Promise<RecipeBudget | null> {
    const [updatedBudget] = await this.db
      .update(recipeBudgets)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recipeBudgets.id, id))
      .returning();

    return (updatedBudget as RecipeBudget) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeBudgets)
      .where(eq(recipeBudgets.id, id));

    return result.length > 0;
  }
}
