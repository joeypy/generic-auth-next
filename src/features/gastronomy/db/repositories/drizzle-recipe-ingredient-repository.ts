import { eq, and, asc } from "drizzle-orm";
import { recipeIngredients } from "../schemas/drizzle-recipe-ingredient-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  RecipeIngredient,
  CreateRecipeIngredientData,
  UpdateRecipeIngredientData,
} from "../../types/recipe-ingredient";

export class RecipeIngredientRepository extends BaseRepository<RecipeIngredient> {
  async create(data: CreateRecipeIngredientData): Promise<RecipeIngredient> {
    const [newIngredient] = await this.db
      .insert(recipeIngredients)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newIngredient as RecipeIngredient;
  }

  async findById(id: string): Promise<RecipeIngredient | null> {
    const [ingredient] = await this.db
      .select()
      .from(recipeIngredients)
      .where(eq(recipeIngredients.id, id));

    return (ingredient as RecipeIngredient) || null;
  }

  async findByRecipeId(recipeId: string): Promise<RecipeIngredient[]> {
    const ingredients = await this.db
      .select()
      .from(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, recipeId))
      .orderBy(asc(recipeIngredients.sortOrder));

    return ingredients as RecipeIngredient[];
  }

  async update(
    id: string,
    data: UpdateRecipeIngredientData
  ): Promise<RecipeIngredient | null> {
    const [updatedIngredient] = await this.db
      .update(recipeIngredients)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recipeIngredients.id, id))
      .returning();

    return (updatedIngredient as RecipeIngredient) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.id, id));

    return result.length > 0;
  }

  async deleteByRecipeId(recipeId: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeIngredients)
      .where(eq(recipeIngredients.recipeId, recipeId));

    return result.length > 0;
  }
}
