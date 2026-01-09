// app/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
      <Loader2 className="animate-spin w-12 h-12 text-primary" />
    </div>
  );
}
