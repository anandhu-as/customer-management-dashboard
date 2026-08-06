"use client";
import { Button } from "@/components/ui/button";
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

const STATUSES = ["Active", "Inactive", "Prospect", "Archive"];
const COMPANIES = ["Acme Corp", "Globex", "Stark Industries", "Innovatech", "Wayne Enterprises"];
const SAVED_FILTERS = ["Active Customers", "Recent Contacts", "Inactive Leads"];

export default function FilterPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-80 overflow-y-auto flex flex-col gap-0 p-0" showCloseButton={false}>

        {/* Header */}
        <SheetHeader className="px-5 py-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* Status Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Status</h3>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {STATUSES.map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <Checkbox id={status} />
                  <label
                    htmlFor={status}
                    className="text-sm cursor-pointer"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Company Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Company</h3>
              <button className="text-xs text-muted-foreground hover:text-foreground">
                Clear
              </button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className="w-full justify-between text-sm font-normal" />
                }
              >
                Select companies...
                <ChevronDown className="h-4 w-4 opacity-50" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72">
                {COMPANIES.map((company) => (
                  <DropdownMenuCheckboxItem key={company}>
                    {company}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator />

          {/* Date Range Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Date Range (Last Contact)</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">From</label>
                <Input type="date" className="text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground">To</label>
                <Input type="date" className="text-sm" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Phone Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Phone Number</h3>
            <Input placeholder="e.g. (555) 123-4567" className="text-sm" />
          </div>

          <Separator />

          {/* Email Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Email Contains</h3>
            <Input placeholder="e.g. @gmail.com" className="text-sm" />
          </div>

          <Separator />

          {/* Save Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Save Current Filter</h3>
            <div className="flex gap-2">
              <Input placeholder="Filter name..." className="text-sm" />
              <Button size="sm" variant="outline">Save</Button>
            </div>
          </div>

          <Separator />

          {/* Saved Filters */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Saved Filters</h3>
            <div className="space-y-2">
              {SAVED_FILTERS.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between px-3 py-2 rounded-md border hover:bg-muted cursor-pointer group"
                >
                  <span className="text-sm">{name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Star size={13} className="text-muted-foreground" />
                    <X size={13} className="text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Buttons */}
        <div className="px-5 py-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1">
            Clear All
          </Button>
          <Button className="flex-1">
            Apply Filters
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
}