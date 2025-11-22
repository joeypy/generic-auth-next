import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/shared/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import type { RecipeFormData } from "../../schemas/recipe-form-schema";

interface IngredientsSectionProps {
  form: UseFormReturn<RecipeFormData>;
  onAddIngredient: () => void;
  onRemoveIngredient: (index: number) => void;
}

// Mock units - en producción, estos vendrían de la base de datos
const UNIT_CATEGORIES = {
  Masa: [
    { id: "kg", name: "Kilogramo", abbr: "kg" },
    { id: "g", name: "Gramo", abbr: "g" },
    { id: "mg", name: "Miligramo", abbr: "mg" },
  ],
  Volumen: [
    { id: "l", name: "Litro", abbr: "l" },
    { id: "ml", name: "Mililitro", abbr: "ml" },
    { id: "cup", name: "Taza", abbr: "taza" },
    { id: "tbsp", name: "Cucharada", abbr: "cdta" },
    { id: "tsp", name: "Cucharadita", abbr: "cdtita" },
  ],
  Unidades: [
    { id: "unit", name: "Unidad", abbr: "unid" },
    { id: "piece", name: "Pieza", abbr: "pza" },
  ],
};

export function IngredientsSection({
  form,
  onAddIngredient,
  onRemoveIngredient,
}: IngredientsSectionProps) {
  const ingredients = form.watch("ingredients") || [];

  return (
    <div className="bg-card rounded-lg border shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Ingredientes</h2>
        <Button type="button" onClick={onAddIngredient} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </div>

      <div className="space-y-4">
        {ingredients.map((_, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 items-start">
            <div className="col-span-12 md:col-span-4">
              <FormField
                control={form.control}
                name={`ingredients.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Ingrediente</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Harina de trigo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-2">
              <FormField
                control={form.control}
                name={`ingredients.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Cantidad</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6 md:col-span-2">
              <FormField
                control={form.control}
                name={`ingredients.${index}.unitId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Unidad</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Unidad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(UNIT_CATEGORIES).map(
                          ([category, units]) => (
                            <SelectGroup key={category}>
                              <SelectLabel>{category}</SelectLabel>
                              {units.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id}>
                                  {unit.name} ({unit.abbr})
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-11 md:col-span-3">
              <FormField
                control={form.control}
                name={`ingredients.${index}.notes`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Notas (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: cortado en cubitos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveIngredient(index)}
                disabled={ingredients.length === 1}
                className="mt-6"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
