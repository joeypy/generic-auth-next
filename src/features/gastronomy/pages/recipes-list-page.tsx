"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useRecipes, useCategories } from "../hooks/use-recipes";
import { RecipeCard } from "../components/recipe-card";
import { RecipeListItem } from "../components/recipe-list-item";
import { RecipeFilters } from "../components/recipe-filters";
import { ViewToggle } from "../components/view-toggle";

export function RecipesListPage() {
  const { recipes, isLoading } = useRecipes();
  const categories = useCategories();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
        (recipe.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ?? false);

      const matchesCategory =
        selectedCategory === "all" || recipe.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Recipes</h1>
            <p className="text-muted-foreground">
              Manage your favorite recipe collection
            </p>
          </div>
          <Link href="/recipes/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Recipe
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <RecipeFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
            categories={categories}
          />
          <ViewToggle view={view} onViewChange={setView} />
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading recipes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No recipes found</p>
            <Link href="/recipes/new">
              <Button variant="outline">Create your first recipe</Button>
            </Link>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRecipes.map((recipe) => (
              <RecipeListItem key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
