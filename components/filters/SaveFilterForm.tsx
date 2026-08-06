import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SaveFilterForm({
  saveFilterName,
  setSaveFilterName,
  onSave,
}: {
  saveFilterName: string;
  setSaveFilterName: (val: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Save Current Filter</h3>
      <div className="flex gap-2">
        <Input
          placeholder="Filter name..."
          className="text-sm"
          value={saveFilterName}
          onChange={(e) => setSaveFilterName(e.target.value)}
        />
        <Button size="sm" variant="outline" onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}
