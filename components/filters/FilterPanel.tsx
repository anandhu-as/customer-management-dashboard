import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X } from "lucide-react";



import { SaveFilterForm } from "./SaveFilterForm";
import { SavedFiltersList, SavedFilter } from "./SavedFiltersList";
import { FilterCriteria } from "@/app/types";
import CompanyFilter from "./CompanyFilter";
import DateRangeFilter from "./DateRangeFilter";
import StatusFilter from "./StatusFilter";
import TextFilter from "./TextFilter";

const FilterPanel=({
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
})=> {
  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [saveFilterName, setSaveFilterName] = useState("");

  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "active-customers",
      name: "Active Customers",
      criteria: { statuses: ["Active"], companies: [], dateFrom: "", dateTo: "", phone: "", email: "" },
    },
    {
      id: "recent-contacts",
      name: "Recent Contacts",
      criteria: { statuses: [], companies: [], dateFrom: "2024-01-01", dateTo: "", phone: "", email: "" },
    },
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
    setSavedFilters((prev) => [
      ...prev,
      {
        id: saveFilterName.trim().toLowerCase().replace(/\s+/g, "-") + "-" + Date.now(),
        name: saveFilterName.trim(),
        criteria: currentCriteria,
      },
    ]);
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

  const deleteSavedFilter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedFilters((prev) => prev.filter((f) => f.id !== id));
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
          <StatusFilter statuses={statuses} toggleStatus={toggleStatus} onClear={() => setStatuses([])} />
          <Separator />
          
          <CompanyFilter companies={companies} selectedCompanies={selectedCompanies} toggleCompany={toggleCompany} onClear={() => setSelectedCompanies([])} />
          <Separator />
          
          <DateRangeFilter dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />
          <Separator />
          
          <TextFilter title="Phone Number" placeholder="e.g. (555) 123-4567" value={phone} onChange={setPhone} />
          <Separator />
          
          <TextFilter title="Email Contains" placeholder="e.g. @gmail.com" value={email} onChange={setEmail} />
          <Separator />
          
          <SaveFilterForm saveFilterName={saveFilterName} setSaveFilterName={setSaveFilterName} onSave={handleSaveFilter} />
          <Separator />
          
          <SavedFiltersList savedFilters={savedFilters} setSavedFilters={setSavedFilters} applySavedFilter={applySavedFilter} deleteSavedFilter={deleteSavedFilter} />
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
export default FilterPanel