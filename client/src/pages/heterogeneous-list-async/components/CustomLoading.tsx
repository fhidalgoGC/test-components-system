export function CustomLoading() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
      </div>
      <p className="text-sm text-muted-foreground font-medium">Cargando elementos...</p>
    </div>
  );
}
