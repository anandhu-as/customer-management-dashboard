import { Input } from "@/components/ui/input";

const DateRangeFilter=({
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}: {
  dateFrom: string;
  setDateFrom: (val: string) => void;
  dateTo: string;
  setDateTo: (val: string) => void;
}) =>{
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Date Range (Last Contact)</h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">From</label>
          <Input type="date" className="text-sm" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">To</label>
          <Input type="date" className="text-sm" value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
export default DateRangeFilter