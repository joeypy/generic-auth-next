import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ChefHat } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import type { Recipe } from "../types/recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardHeader className="p-0">
          <div className="relative w-full h-48 bg-muted">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ChefHat className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
            {recipe.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.category && (
              <Badge variant="secondary">{recipe.category}</Badge>
            )}
            {recipe.difficulty && (
              <Badge variant="outline">{recipe.difficulty}</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
        </CardContent>
        {recipe.tags && recipe.tags.length > 0 && (
          <CardFooter className="px-4 py-3 border-t">
            <div className="flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-muted rounded-full"
                >
                  {tag}
                </span>
              ))}
              {recipe.tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{recipe.tags.length - 3} more
                </span>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
