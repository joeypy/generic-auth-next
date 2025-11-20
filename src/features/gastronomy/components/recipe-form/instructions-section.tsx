import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form";
import type { RecipeFormData } from "../../schemas/recipe-form-schema";

interface InstructionsSectionProps {
  form: UseFormReturn<RecipeFormData>;
  onAddInstruction: () => void;
  onRemoveInstruction: (index: number) => void;
}

export function InstructionsSection({
  form,
  onAddInstruction,
  onRemoveInstruction,
}: InstructionsSectionProps) {
  const instructions = form.watch("instructions") || [];

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Instrucciones</h2>
        <Button type="button" onClick={onAddInstruction} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Agregar paso
        </Button>
      </div>

      <div className="space-y-4">
        {instructions.map((_, index) => (
          <div key={index} className="flex items-start gap-4">
            <Badge
              variant="secondary"
              className="mt-2 flex-shrink-0 h-7 w-7 flex items-center justify-center"
            >
              {index + 1}
            </Badge>

            <FormField
              control={form.control}
              name={`instructions.${index}.instruction`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder={`Paso ${index + 1}`}
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {instructions.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveInstruction(index)}
                className="mt-2"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
