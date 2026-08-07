"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Download, Filter } from "lucide-react";
import { Customer, CustomerTableToolbarProps } from "@/app/types";


const CustomerTableToolbar=({
  searchQuery,
  setSearchQuery,
  activeFilterCount,
  onOpenFilterPanel,
  onAddCustomer,
  displayedCustomers,
}: CustomerTableToolbarProps)=> {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenFilterPanel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenFilterPanel]);

  const handleExportCSV = () => {
    if (displayedCustomers.length === 0) return;

    const headers = ["Name", "Email", "Phone", "Company", "Status", "Last Contact"];
    const csvContent = [
      headers.join(","),
      ...displayedCustomers.map(c =>
        `"${c.name}","${c.email}","${c.phone}","${c.company}","${c.status}","${c.lastContactDate || ""}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button size="sm" onClick={onAddCustomer}>
            <Plus size={16} className="mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name, email or company..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="outline" size="sm" onClick={onOpenFilterPanel} className="relative">
          <Filter size={16} className="mr-2" />
          Filters <span className="ml-1 text-xs text-muted-foreground">(Ctrl+K)</span>
          {activeFilterCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>
    </>
  );
}
export default CustomerTableToolbar