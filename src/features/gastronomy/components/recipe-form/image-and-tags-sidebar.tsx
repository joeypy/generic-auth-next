import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import type { RecipeFormData } from "../../schemas/recipe-form-schema";

interface ImageAndTagsSidebarProps {
  form: UseFormReturn<RecipeFormData>;
  newTag: string;
  onNewTagChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export function ImageAndTagsSidebar({
  form,
  newTag,
  onNewTagChange,
  onAddTag,
  onRemoveTag,
}: ImageAndTagsSidebarProps) {
  const imageUrl = form.watch("imageUrl");
  const tags = form.watch("tags") || [];

  return (
    <div className="space-y-6">
      {/* Image Section */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Imagen del Plato</h3>

        <div className="space-y-4">
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => form.setValue("imageUrl", "")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de la imagen</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-muted-foreground">
            <p>💡 Puedes usar imágenes de:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Pexels.com</li>
              <li>Unsplash.com</li>
              <li>Tu propia URL</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="bg-card rounded-lg border p-6">
        <h3 className="text-lg font-semibold mb-4">Etiquetas</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={newTag}
              onChange={(e) => onNewTagChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onAddTag();
                }
              }}
              placeholder="Agregar etiqueta"
            />
            <Button type="button" variant="secondary" onClick={onAddTag}>
              Agregar
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                <span>{tag}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => onRemoveTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
