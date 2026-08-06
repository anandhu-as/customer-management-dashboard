"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Plus, ArrowUpDown, Pencil, Trash2, Download, MoreHorizontal, Eye, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusColors } from "@/app/constants/customer";
import { useState } from "react";
import CustomerModal from "./CustomerModel";
import AddCustomerForm from "./addCustomerForm";
import { useGetCustomers } from "@/app/hooks/useCustomers";
import { Customer } from "@/app/types"; 
import FilterPanel, { FilterCriteria } from "../filters/FilterPanel";

const CustomerTable = ({ limit, hideFilters }: { limit?: number; hideFilters?: boolean } = {}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete" | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterCriteria | null>(null);

  const { data: customers = [], isLoading, isError } = useGetCustomers();

  const companies = Array.from(new Set(customers.map(c => c.company))).filter(Boolean);

  const filteredCustomers = customers.filter(customer => {
    // 1. Search Query
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // 2. Advanced Filters
    if (activeFilters) {
      if (activeFilters.statuses.length > 0 && !activeFilters.statuses.includes(customer.status)) return false;
      if (activeFilters.companies.length > 0 && !activeFilters.companies.includes(customer.company)) return false;
      if (activeFilters.phone && !customer.phone.includes(activeFilters.phone)) return false;
      if (activeFilters.email && !customer.email.toLowerCase().includes(activeFilters.email.toLowerCase())) return false;
      
      if (activeFilters.dateFrom && customer.lastContactDate) {
        if (new Date(customer.lastContactDate) < new Date(activeFilters.dateFrom)) return false;
      }
      if (activeFilters.dateTo && customer.lastContactDate) {
        if (new Date(customer.lastContactDate) > new Date(activeFilters.dateTo)) return false;
      }
    }

    return true;
  });

  const displayedCustomers = limit ? filteredCustomers.slice(0, limit) : filteredCustomers;

  const handleOpenModal = (mode: "view" | "edit" | "delete", customer: Customer) => {
    setSelectedCustomer(customer);
    setModalMode(mode);
  };

  const activeFilterCount = activeFilters ? 
    (activeFilters.statuses.length > 0 ? 1 : 0) +
    (activeFilters.companies.length > 0 ? 1 : 0) +
    (activeFilters.phone ? 1 : 0) +
    (activeFilters.email ? 1 : 0) +
    (activeFilters.dateFrom || activeFilters.dateTo ? 1 : 0) : 0;

  return (
    <div className="space-y-4">
      {!hideFilters && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Customers</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
              <Button size="sm" onClick={() => setIsAddFormOpen(true)}>
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
            <Button variant="outline" size="sm" onClick={() => setPanelOpen(true)} className="relative">
              <Filter size={16} className="mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </>
      )}

      <div className={cn("overflow-y-auto w-full", !hideFilters ? "rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] max-h-[calc(100vh-260px)]" : "")}>
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead>
                <button className="flex items-center font-semibold">
                  Name <ArrowUpDown size={14} className="ml-1 text-muted-foreground" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center font-semibold">
                  Email <ArrowUpDown size={14} className="ml-1 text-muted-foreground" />
                </button>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <button className="flex items-center font-semibold">
                  Last Contact <ArrowUpDown size={14} className="ml-1 text-muted-foreground" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span>Loading customers...</span>
                  </div>
                </TableCell>
              </TableRow>
            )}

           
            {isError && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-red-500">
                  Failed to load customers. Please refresh or try again.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && displayedCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No customers found.
                </TableCell>
              </TableRow>
            )}

      
            {!isLoading && !isError && displayedCustomers.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer border-b border-white/5 transition-all hover:bg-white/5 data-[state=selected]:bg-white/5 group"
                onClick={() => handleOpenModal("view", customer)}
              >
                <TableCell className="font-medium py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-sm font-bold shrink-0 shadow-inner ring-1 ring-primary/20 group-hover:scale-105 transition-transform">
                      {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    {customer.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                <TableCell>{customer.company}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-xs font-semibold ring-1 ring-inset border-0 shadow-sm backdrop-blur-sm",
                      statusColors[customer.status]
                    )}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.lastContactDate}</TableCell>
                <TableCell className="text-right">
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0 border-0 bg-transparent cursor-pointer">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleOpenModal("view", customer)}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Show</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenModal("edit", customer)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleOpenModal("delete", customer)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <FilterPanel 
        open={panelOpen} 
        onClose={() => setPanelOpen(false)} 
        companies={companies}
        initialFilters={activeFilters || undefined}
        onApply={(filters) => setActiveFilters(filters)}
      />

     
      <CustomerModal
        open={!!modalMode}
        mode={modalMode || "view"}
        customer={selectedCustomer}
        onClose={() => {
          setModalMode(null);
          setSelectedCustomer(null);
        }}
      />

      <AddCustomerForm open={isAddFormOpen} onClose={() => setIsAddFormOpen(false)} />
    </div>
  );
};

export default CustomerTable;