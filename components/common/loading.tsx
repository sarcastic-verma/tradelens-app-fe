import { Loader2 } from "lucide-react";

export const Loading = () => (
  <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center animate-fade-in">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
    </div>
  </div>
);
