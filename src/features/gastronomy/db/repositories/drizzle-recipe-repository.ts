import { eq, and, desc } from "drizzle-orm";
import { generateId } from "@/shared/utils/id-generator";
import { recipes } from "../schemas/drizzle-recipe-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  Recipe,
  CreateRecipeData,
  UpdateRecipeData,
} from "../../types/recipe";

export class RecipeRepository extends BaseRepository<Recipe> {
  async create(data: CreateRecipeData): Promise<Recipe> {
    const [newRecipe] = await this.db
      .insert(recipes)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newRecipe as Recipe;
  }

  async findById(id: string): Promise<Recipe | null> {
    const [recipe] = await this.db
      .select()
      .from(recipes)
      .where(eq(recipes.id, id));

    return (recipe as Recipe) || null;
  }

  async findByUserId(userId: string): Promise<Recipe[]> {
    const userRecipes = await this.db
      .select()
      .from(recipes)
      .where(eq(recipes.userId, userId))
      .orderBy(desc(recipes.createdAt));

    return userRecipes as Recipe[];
  }

  async findByCategory(
    userId: string,
    category: string
  ): Promise<Recipe[]> {
    const categoryRecipes = await this.db
      .select()
      .from(recipes)
      .where(and(eq(recipes.userId, userId), eq(recipes.category, category)))
      .orderBy(desc(recipes.createdAt));

    return categoryRecipes as Recipe[];
  }

  async findSubrecipes(userId: string): Promise<Recipe[]> {
    const subrecipes = await this.db
      .select()
      .from(recipes)
      .where(and(eq(recipes.userId, userId), eq(recipes.isSubrecipe, true)))
      .orderBy(desc(recipes.createdAt));

    return subrecipes as Recipe[];
  }

  async update(id: string, data: UpdateRecipeData): Promise<Recipe | null> {
    const [updatedRecipe] = await this.db
      .update(recipes)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recipes.id, id))
      .returning();

    return (updatedRecipe as Recipe) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db.delete(recipes).where(eq(recipes.id, id));

    return result.length > 0;
  }
}
