"use client";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Star, ChevronDown } from "lucide-react";

export type FilterCriteria = {
  statuses: string[];
  companies: string[];
  dateFrom: string;
  dateTo: string;
  phone: string;
  email: string;
};

const STATUSES = ["Active", "Inactive", "Prospect", "Archive"];
export default function FilterPanel({
  open,
  onClose,
  companies = [],
  initialFilters,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  companies?: string[];
  initialFilters?: FilterCriteria;
  onApply?: (filters: FilterCriteria) => void;
}) {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saveFilterName, setSaveFilterName] = useState("");

  const [savedFilters, setSavedFilters] = useState<{ name: string, criteria: FilterCriteria }[]>([
    { name: "Active Customers", criteria: { statuses: ["Active"], companies: [], dateFrom: "", dateTo: "", phone: "", email: "" } },
    { name: "Recent Contacts", criteria: { statuses: [], companies: [], dateFrom: "2024-01-01", dateTo: "", phone: "", email: "" } }
  ]);

  useEffect(() => {
    if (open) {
      setStatuses(initialFilters?.statuses || []);
      setSelectedCompanies(initialFilters?.companies || []);
      setDateFrom(initialFilters?.dateFrom || "");
      setDateTo(initialFilters?.dateTo || "");
      setPhone(initialFilters?.phone || "");
      setEmail(initialFilters?.email || "");
    }
  }, [open, initialFilters]);

  const handleApply = () => {
    onApply?.({
      statuses,
      companies: selectedCompanies,
      dateFrom,
      dateTo,
      phone,
      email,
    });
    onClose();
  };

  const handleClear = () => {
    setStatuses([]);
    setSelectedCompanies([]);
    setDateFrom("");
    setDateTo("");
    setPhone("");
    setEmail("");
    onApply?.({
      statuses: [],
      companies: [],
      dateFrom: "",
      dateTo: "",
      phone: "",
      email: "",
    });
  };

  const toggleStatus = (status: string) => {
    setStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const handleSaveFilter = () => {
    if (!saveFilterName.trim()) return;
    const currentCriteria: FilterCriteria = {
      statuses,
      companies: selectedCompanies,
      dateFrom,
      dateTo,
      phone,
      email,
    };
    setSavedFilters(prev => [...prev, { name: saveFilterName.trim(), criteria: currentCriteria }]);
    setSaveFilterName("");
  };

  const applySavedFilter = (criteria: FilterCriteria) => {
    setStatuses(criteria.statuses || []);
    setSelectedCompanies(criteria.companies || []);
    setDateFrom(criteria.dateFrom || "");
    setDateTo(criteria.dateTo || "");
    setPhone(criteria.phone || "");
    setEmail(criteria.email || "");
  };

  const deleteSavedFilter = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFilters(prev => prev.filter(f => f.name !== name));
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-80 overflow-y-auto flex flex-col gap-0 p-0" showCloseButton={false}>
        <SheetHeader className="px-5 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Status</h3>
              <button
                onClick={() => setStatuses([])}
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

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Company</h3>
              <button
                onClick={() => setSelectedCompanies([])}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between text-sm font-normal")}>
                {selectedCompanies.length > 0 ? `${selectedCompanies.length} selected` : "Select companies..."}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 max-h-60 overflow-y-auto">
                {companies.map((company) => (
                  <DropdownMenuCheckboxItem
                    key={company}
                    checked={selectedCompanies.includes(company)}
                    onCheckedChange={() => toggleCompany(company)}
                  >
                    {company}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

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

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Phone Number</h3>
            <Input placeholder="e.g. (555) 123-4567" className="text-sm" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Email Contains</h3>
            <Input placeholder="e.g. @gmail.com" className="text-sm" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Save Current Filter</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Filter name..."
                className="text-sm"
                value={saveFilterName}
                onChange={(e) => setSaveFilterName(e.target.value)}
              />
              <Button size="sm" variant="outline" onClick={handleSaveFilter}>Save</Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Saved Filters</h3>
            <div className="space-y-2">
              {savedFilters.length === 0 && <p className="text-sm text-muted-foreground">No saved filters yet.</p>}
              {savedFilters.map((filter) => (
                <div
                  key={filter.name}
                  onClick={() => applySavedFilter(filter.criteria)}
                  className="flex items-center justify-between px-3 py-2 rounded-md border hover:bg-muted cursor-pointer group transition-colors"
                >
                  <span className="text-sm font-medium">{filter.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-500" onClick={(e) => deleteSavedFilter(filter.name, e)}>
                      <X size={13} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1" onClick={handleClear}>
            Clear All
          </Button>
          <Button className="flex-1" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}