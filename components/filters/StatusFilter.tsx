import { Checkbox } from "@/components/ui/checkbox";

const STATUSES = ["Active", "Inactive", "Prospect", "Archive"];

export function StatusFilter({
  statuses,
  toggleStatus,
  onClear,
}: {
  statuses: string[];
  toggleStatus: (status: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Status</h3>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      </div>
      <div className="space-y-2">
        {STATUSES.map((status) => (
          <div key={status} className="flex items-center gap-2">
            <Checkbox
              id={status}
              checked={statuses.includes(status)}
              onCheckedChange={() => toggleStatus(status)}
            />
            <label htmlFor={status} className="text-sm cursor-pointer">
              {status}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
