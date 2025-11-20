import { eq, and, asc } from "drizzle-orm";
import { recipeSubrecipes } from "../schemas/drizzle-recipe-subrecipe-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  RecipeSubrecipe,
  CreateRecipeSubrecipeData,
  UpdateRecipeSubrecipeData,
} from "../../types/recipe-subrecipe";

export class RecipeSubrecipeRepository extends BaseRepository<RecipeSubrecipe> {
  async create(data: CreateRecipeSubrecipeData): Promise<RecipeSubrecipe> {
    const [newSubrecipe] = await this.db
      .insert(recipeSubrecipes)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newSubrecipe as RecipeSubrecipe;
  }

  async findById(id: string): Promise<RecipeSubrecipe | null> {
    const [subrecipe] = await this.db
      .select()
      .from(recipeSubrecipes)
      .where(eq(recipeSubrecipes.id, id));

    return (subrecipe as RecipeSubrecipe) || null;
  }

  async findByParentRecipeId(
    parentRecipeId: string
  ): Promise<RecipeSubrecipe[]> {
    const subrecipes = await this.db
      .select()
      .from(recipeSubrecipes)
      .where(eq(recipeSubrecipes.parentRecipeId, parentRecipeId))
      .orderBy(asc(recipeSubrecipes.sortOrder));

    return subrecipes as RecipeSubrecipe[];
  }

  async findBySubrecipeId(subrecipeId: string): Promise<RecipeSubrecipe[]> {
    const parentRecipes = await this.db
      .select()
      .from(recipeSubrecipes)
      .where(eq(recipeSubrecipes.subrecipeId, subrecipeId));

    return parentRecipes as RecipeSubrecipe[];
  }

  async update(
    id: string,
    data: UpdateRecipeSubrecipeData
  ): Promise<RecipeSubrecipe | null> {
    const [updatedSubrecipe] = await this.db
      .update(recipeSubrecipes)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recipeSubrecipes.id, id))
      .returning();

    return (updatedSubrecipe as RecipeSubrecipe) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeSubrecipes)
      .where(eq(recipeSubrecipes.id, id));

    return result.length > 0;
  }

  async deleteByParentRecipeId(parentRecipeId: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeSubrecipes)
      .where(eq(recipeSubrecipes.parentRecipeId, parentRecipeId));

    return result.length > 0;
  }
}
