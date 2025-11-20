import Link from "next/link";
import { Clock, Users, ChefHat } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import type { Recipe } from "../types/recipe";

interface RecipeListItemProps {
  recipe: Recipe;
}

export function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer group"
    >
      <div className="flex-shrink-0 w-20 h-20 bg-muted rounded-md overflow-hidden flex items-center justify-center">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <ChefHat className="h-8 w-8 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-1 truncate group-hover:text-primary transition-colors">
          {recipe.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {recipe.prepTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime}m</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center gap-2">
        {recipe.category && (
          <Badge variant="secondary">{recipe.category}</Badge>
        )}
        {recipe.difficulty && (
          <Badge variant="outline">{recipe.difficulty}</Badge>
        )}
      </div>
    </Link>
  );
}
