import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface ViewToggleProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex gap-1 border rounded-md p-1">
      <Button
        variant={view === "grid" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("grid")}
        className="gap-2"
      >
        <LayoutGrid className="h-4 w-4" />
        Grid
      </Button>
      <Button
        variant={view === "list" ? "secondary" : "ghost"}
        size="sm"
        onClick={() => onViewChange("list")}
        className="gap-2"
      >
        <List className="h-4 w-4" />
        List
      </Button>
    </div>
  );
}
