"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";

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
  const [showCancelDialog, setShowCancelDialog] = useState(false);

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

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    onCancel();
  };

  return (
    <>
      <div className="bg-card rounded-lg border shadow-md p-6">
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
            onClick={handleCancelClick}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        </div>
      </div>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {mode === "create"
                ? "Si cancelas, se perderán todos los datos ingresados. ¿Deseas continuar?"
                : mode === "edit"
                ? "Si cancelas, se perderán todos los cambios realizados. ¿Deseas continuar?"
                : "Si cancelas, se perderán todos los datos de la copia. ¿Deseas continuar?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continuar editando</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              className="bg-red-500 hover:bg-red-600"
            >
              Sí, cancelar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
