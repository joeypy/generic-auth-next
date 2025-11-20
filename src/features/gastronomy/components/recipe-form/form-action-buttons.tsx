import { Button } from "@/shared/components/ui/button";

interface FormActionButtonsProps {
  mode: "create" | "edit" | "duplicate";
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function FormActionButtons({
  mode,
  onCancel,
  isSubmitting = false,
}: FormActionButtonsProps) {
  const getButtonText = () => {
    switch (mode) {
      case "create":
        return "Crear Receta";
      case "edit":
        return "Guardar Cambios";
      case "duplicate":
        return "Duplicar Receta";
    }
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : getButtonText()}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
