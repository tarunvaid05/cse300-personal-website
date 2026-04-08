export function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-16 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {new Date().getFullYear()} Tarun Vaidhyanathan
        </p>
        <p className="text-sm text-muted-foreground font-mono">
          Large-scale systems. Clean logic. Real impact.
        </p>
      </div>
    </footer>
  );
}
