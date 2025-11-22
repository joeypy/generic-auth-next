"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

type TableDataType = "ingredients" | "utensils" | "tips" | "instructions";

interface IngredientRow {
  name: string;
  quantity: number;
  unitId?: string;
  notes?: string;
}

interface UtensilRow {
  name: string;
}

interface TipRow {
  text: string;
}

interface InstructionRow {
  stepNumber: number;
  instruction: string;
}

type TableRowData = IngredientRow | UtensilRow | TipRow | InstructionRow;

interface ReusableTableProps {
  type: TableDataType;
  data: TableRowData[];
}

export function ReusableTable({ type, data }: ReusableTableProps) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-4">
        No hay datos disponibles.
      </p>
    );
  }

  if (type === "ingredients") {
    const ingredients = data as IngredientRow[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Cantidad</TableHead>
            <TableHead>Ingrediente</TableHead>
            <TableHead className="w-[150px]">Notas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell>
                {ingredient.quantity} {ingredient.unitId || ""}
              </TableCell>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {ingredient.notes || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === "utensils") {
    const utensils = data as UtensilRow[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utensilio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {utensils.map((utensil, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{utensil.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === "tips") {
    const tips = data as TipRow[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tip</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tips.map((tip, index) => (
            <TableRow key={index}>
              <TableCell>{tip.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (type === "instructions") {
    const instructions = data as InstructionRow[];
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Paso</TableHead>
            <TableHead>Instrucción</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {instructions.map((instruction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {instruction.stepNumber}
              </TableCell>
              <TableCell>{instruction.instruction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return null;
}

