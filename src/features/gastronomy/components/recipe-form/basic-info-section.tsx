import { UseFormReturn } from "react-hook-form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { RecipeFormData } from "../../schemas/recipe-form-schema";

interface BasicInfoSectionProps {
  form: UseFormReturn<RecipeFormData>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="bg-card rounded-lg border shadow-md p-6 space-y-6">
      <h2 className="text-xl font-semibold">Información Básica</h2>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre de la receta *</FormLabel>
            <FormControl>
              <Input
                placeholder="Ej: Pasta Carbonara Clásica"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe tu receta..."
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoría</FormLabel>
            <FormControl>
              <Input
                placeholder="Ej: Postres, Platos principales, Ensaladas"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
