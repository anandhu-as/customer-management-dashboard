"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CustomerModal from "./CustomerModel";
import AddCustomerForm from "./addCustomerForm";
import { useGetCustomers } from "@/app/hooks/useCustomers";
import { Customer, FilterCriteria } from "@/app/types";
import FilterPanel from "../filters/FilterPanel";

import CustomerTableToolbar from "./CustomerTableToolbar";
import CustomerTableRow from "./CustomerTableRow";
import CustomerTablePagination from "./CustomerTablePagination";

const ITEMS_PER_PAGE = 10;

const CustomerTable = ({ limit, hideFilters, initialCustomers }: { limit?: number; hideFilters?: boolean; initialCustomers?: Customer[] } = {}) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete" | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<FilterCriteria | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const { data: customers = [], isLoading, isError } = useGetCustomers(initialCustomers);

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

  //Reset page when filters change
  const handleApplyFilters = (filters: FilterCriteria) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const activeFilterCount = activeFilters ?
    (activeFilters.statuses.length > 0 ? 1 : 0) +
    (activeFilters.companies.length > 0 ? 1 : 0) +
    (activeFilters.phone ? 1 : 0) +
    (activeFilters.email ? 1 : 0) +
    (activeFilters.dateFrom || activeFilters.dateTo ? 1 : 0) : 0;

  // Pagination logic
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  // If limit is provided, use limit instead of pagination (e.g. for dashboard widget)
  const displayedCustomers = limit
    ? filteredCustomers.slice(0, limit)
    : filteredCustomers.slice(startIndex, endIndex);

  const handleOpenModal = (mode: "view" | "edit" | "delete", customer: Customer) => {
    setSelectedCustomer(customer);
    setModalMode(mode);
  };

  return (
    <div className="space-y-4">
      {!hideFilters && (
        <CustomerTableToolbar
          searchQuery={searchQuery}
          setSearchQuery={handleSearchQueryChange}
          activeFilterCount={activeFilterCount}
          onOpenFilterPanel={() => setPanelOpen(true)}
          onAddCustomer={() => setIsAddFormOpen(true)}
          displayedCustomers={filteredCustomers} // Export all matched, not just paginated
        />
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
              <CustomerTableRow
                key={customer.id}
                customer={customer}
                onOpenModal={handleOpenModal}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {!hideFilters && !isLoading && !isError && (
        <CustomerTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}

      <FilterPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        companies={companies}
        initialFilters={activeFilters || undefined}
        onApply={handleApplyFilters}
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