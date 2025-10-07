import { CheckCircle } from "lucide-react";

export function EndComponent() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8 border-t border-dashed border-muted-foreground/30">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle className="w-6 h-6 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-sm">¡Fin de la lista!</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Has alcanzado el final de los elementos
        </p>
      </div>
    </div>
  );
}
