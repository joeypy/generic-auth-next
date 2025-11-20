import { RecipeBudgetRepository } from "../db/repositories/drizzle-recipe-budget-repository";
import {
  RecipeBudget,
  CreateRecipeBudgetData,
  UpdateRecipeBudgetData,
} from "../types/recipe-budget";

export class BudgetService {
  constructor(private budgetRepository: RecipeBudgetRepository) {}

  async createBudget(data: CreateRecipeBudgetData): Promise<RecipeBudget> {
    // Calculate total cost
    const totalCost =
      Number(data.ingredientCost || 0) +
      Number(data.laborCost || 0) +
      Number(data.overheadCost || 0) +
      Number(data.packagingCost || 0) +
      Number(data.otherCosts || 0);

    // Calculate selling price based on profit margin
    const profitMargin = Number(data.profitMarginPercentage || 0);
    const sellingPrice =
      totalCost + totalCost * (profitMargin / 100);

    return this.budgetRepository.create({
      ...data,
      totalCost: totalCost.toString(),
      sellingPrice: sellingPrice.toString(),
    });
  }

  async getBudgetById(id: string): Promise<RecipeBudget | null> {
    return this.budgetRepository.findById(id);
  }

  async getBudgetsByRecipeId(recipeId: string): Promise<RecipeBudget[]> {
    return this.budgetRepository.findByRecipeId(recipeId);
  }

  async getBudgetsByUserId(userId: string): Promise<RecipeBudget[]> {
    return this.budgetRepository.findByUserId(userId);
  }

  async getBudgetsByStatus(
    userId: string,
    status: string
  ): Promise<RecipeBudget[]> {
    return this.budgetRepository.findByStatus(userId, status);
  }

  async updateBudget(
    id: string,
    data: UpdateRecipeBudgetData
  ): Promise<RecipeBudget | null> {
    // Recalculate totals if cost fields are updated
    const budget = await this.budgetRepository.findById(id);
    if (!budget) return null;

    const ingredientCost = Number(data.ingredientCost ?? budget.ingredientCost);
    const laborCost = Number(data.laborCost ?? budget.laborCost);
    const overheadCost = Number(data.overheadCost ?? budget.overheadCost);
    const packagingCost = Number(data.packagingCost ?? budget.packagingCost);
    const otherCosts = Number(data.otherCosts ?? budget.otherCosts);

    const totalCost =
      ingredientCost + laborCost + overheadCost + packagingCost + otherCosts;

    const profitMargin = Number(
      data.profitMarginPercentage ?? budget.profitMarginPercentage
    );
    const sellingPrice = totalCost + totalCost * (profitMargin / 100);

    return this.budgetRepository.update(id, {
      ...data,
      totalCost: totalCost.toString(),
      sellingPrice: sellingPrice.toString(),
    });
  }

  async deleteBudget(id: string): Promise<boolean> {
    return this.budgetRepository.delete(id);
  }

  // Calculate cost per serving
  async getCostPerServing(budgetId: string): Promise<number | null> {
    const budget = await this.budgetRepository.findById(budgetId);
    if (!budget || budget.servings === 0) return null;

    return Number(budget.totalCost) / budget.servings;
  }

  // Calculate profit per serving
  async getProfitPerServing(budgetId: string): Promise<number | null> {
    const budget = await this.budgetRepository.findById(budgetId);
    if (!budget || budget.servings === 0) return null;

    const profit = Number(budget.sellingPrice) - Number(budget.totalCost);
    return profit / budget.servings;
  }
}
