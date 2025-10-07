import { FileQuestion } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <FileQuestion className="w-8 h-8 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-1">No hay elementos</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          La lista está vacía. Usa los botones de control para cargar elementos.
        </p>
      </div>
    </div>
  );
}
