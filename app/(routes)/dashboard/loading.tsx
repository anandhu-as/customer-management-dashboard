import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg font-medium text-gray-500">Loading Dashboard...</p>
      </div>
    </div>
  );
}
