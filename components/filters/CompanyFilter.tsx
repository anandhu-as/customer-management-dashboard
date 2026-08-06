import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function CompanyFilter({
  companies,
  selectedCompanies,
  toggleCompany,
  onClear,
}: {
  companies: string[];
  selectedCompanies: string[];
  toggleCompany: (company: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Company</h3>
        <button
          onClick={onClear}
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
  );
}
