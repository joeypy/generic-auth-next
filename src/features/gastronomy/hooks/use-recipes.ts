"use client";

import { useState, useEffect } from "react";
import type { Recipe } from "../types/recipe";

// Mock data for development - will be replaced with real API calls
const mockRecipes: Recipe[] = [];

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Implement real API call to fetch recipes
  useEffect(() => {
    // Placeholder for future API integration
    setIsLoading(false);
  }, []);

  return { recipes, isLoading };
}

export function useCategories() {
  // TODO: Fetch categories from database or extract from recipes
  return ["appetizer", "main course", "dessert", "beverage", "side dish"];
}
