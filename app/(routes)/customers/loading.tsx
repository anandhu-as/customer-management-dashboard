import { Loader2 } from "lucide-react";

export default function CustomersLoading() {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 bg-muted animate-pulse rounded-md"></div>
        <div className="flex gap-2">
          <div className="h-10 w-24 bg-muted animate-pulse rounded-md"></div>
          <div className="h-10 w-32 bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-sm p-4">
        <div className="space-y-4">
          <div className="h-12 w-full bg-muted animate-pulse rounded-md"></div>
          <div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>
          <div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>
          <div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>
          <div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>
          <div className="h-16 w-full bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
