import { eq, and, asc } from "drizzle-orm";
import { recipeInstructions } from "../schemas/drizzle-recipe-instruction-schema";
import { BaseRepository } from "@/shared/database/base-repository";
import {
  RecipeInstruction,
  CreateRecipeInstructionData,
  UpdateRecipeInstructionData,
} from "../../types/recipe-instruction";

export class RecipeInstructionRepository extends BaseRepository<RecipeInstruction> {
  async create(
    data: CreateRecipeInstructionData
  ): Promise<RecipeInstruction> {
    const [newInstruction] = await this.db
      .insert(recipeInstructions)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .returning();

    return newInstruction as RecipeInstruction;
  }

  async findById(id: string): Promise<RecipeInstruction | null> {
    const [instruction] = await this.db
      .select()
      .from(recipeInstructions)
      .where(eq(recipeInstructions.id, id));

    return (instruction as RecipeInstruction) || null;
  }

  async findByRecipeId(recipeId: string): Promise<RecipeInstruction[]> {
    const instructions = await this.db
      .select()
      .from(recipeInstructions)
      .where(eq(recipeInstructions.recipeId, recipeId))
      .orderBy(asc(recipeInstructions.stepNumber));

    return instructions as RecipeInstruction[];
  }

  async update(
    id: string,
    data: UpdateRecipeInstructionData
  ): Promise<RecipeInstruction | null> {
    const [updatedInstruction] = await this.db
      .update(recipeInstructions)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(recipeInstructions.id, id))
      .returning();

    return (updatedInstruction as RecipeInstruction) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeInstructions)
      .where(eq(recipeInstructions.id, id));

    return result.length > 0;
  }

  async deleteByRecipeId(recipeId: string): Promise<boolean> {
    const result = await this.db
      .delete(recipeInstructions)
      .where(eq(recipeInstructions.recipeId, recipeId));

    return result.length > 0;
  }
}
