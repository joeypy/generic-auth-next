import { RecipeRepository } from "../db/repositories/drizzle-recipe-repository";
import { RecipeIngredientRepository } from "../db/repositories/drizzle-recipe-ingredient-repository";
import { RecipeInstructionRepository } from "../db/repositories/drizzle-recipe-instruction-repository";
import { RecipeSubrecipeRepository } from "../db/repositories/drizzle-recipe-subrecipe-repository";
import {
  Recipe,
  CreateRecipeData,
  UpdateRecipeData,
} from "../types/recipe";
import {
  RecipeIngredient,
  CreateRecipeIngredientData,
} from "../types/recipe-ingredient";
import {
  RecipeInstruction,
  CreateRecipeInstructionData,
} from "../types/recipe-instruction";

export class RecipeService {
  constructor(
    private recipeRepository: RecipeRepository,
    private ingredientRepository: RecipeIngredientRepository,
    private instructionRepository: RecipeInstructionRepository,
    private subrecipeRepository: RecipeSubrecipeRepository
  ) {}

  async createRecipe(data: CreateRecipeData): Promise<Recipe> {
    return this.recipeRepository.create(data);
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.recipeRepository.findById(id);
  }

  async getRecipesByUserId(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.findByUserId(userId);
  }

  async getRecipesByCategory(
    userId: string,
    category: string
  ): Promise<Recipe[]> {
    return this.recipeRepository.findByCategory(userId, category);
  }

  async getSubrecipes(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.findSubrecipes(userId);
  }

  async updateRecipe(
    id: string,
    data: UpdateRecipeData
  ): Promise<Recipe | null> {
    return this.recipeRepository.update(id, data);
  }

  async deleteRecipe(id: string): Promise<boolean> {
    // Delete related data first
    await this.ingredientRepository.deleteByRecipeId(id);
    await this.instructionRepository.deleteByRecipeId(id);
    await this.subrecipeRepository.deleteByParentRecipeId(id);

    return this.recipeRepository.delete(id);
  }

  // Ingredient operations
  async addIngredient(
    data: CreateRecipeIngredientData
  ): Promise<RecipeIngredient> {
    return this.ingredientRepository.create(data);
  }

  async getRecipeIngredients(recipeId: string): Promise<RecipeIngredient[]> {
    return this.ingredientRepository.findByRecipeId(recipeId);
  }

  async deleteIngredient(ingredientId: string): Promise<boolean> {
    return this.ingredientRepository.delete(ingredientId);
  }

  // Instruction operations
  async addInstruction(
    data: CreateRecipeInstructionData
  ): Promise<RecipeInstruction> {
    return this.instructionRepository.create(data);
  }

  async getRecipeInstructions(
    recipeId: string
  ): Promise<RecipeInstruction[]> {
    return this.instructionRepository.findByRecipeId(recipeId);
  }

  async deleteInstruction(instructionId: string): Promise<boolean> {
    return this.instructionRepository.delete(instructionId);
  }

  // Complete recipe with all details
  async getCompleteRecipe(recipeId: string) {
    const recipe = await this.recipeRepository.findById(recipeId);
    if (!recipe) return null;

    const [ingredients, instructions, subrecipes] = await Promise.all([
      this.ingredientRepository.findByRecipeId(recipeId),
      this.instructionRepository.findByRecipeId(recipeId),
      this.subrecipeRepository.findByParentRecipeId(recipeId),
    ]);

    return {
      ...recipe,
      ingredients,
      instructions,
      subrecipes,
    };
  }
}
