import { Input } from "@/components/ui/input";

export function TextFilter({
  title,
  placeholder,
  value,
  onChange,
}: {
  title: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">{title}</h3>
      <Input placeholder={placeholder} className="text-sm" value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
}
