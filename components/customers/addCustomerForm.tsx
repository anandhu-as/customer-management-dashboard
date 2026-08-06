"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddCustomerForm({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] overflow-y-auto flex flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle>Add New Customer</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Customer Details</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium">Name</label>
                <Input placeholder="e.g. John Doe" className="text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Email</label>
                <Input type="email" placeholder="e.g. john@example.com" className="text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Phone</label>
                <Input placeholder="e.g. +1 (555) 000-0000" className="text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Company</label>
                <Input placeholder="e.g. Acme Corp" className="text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Status</label>
                <Select defaultValue="Prospect">
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="Archive">Archive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1 pt-2">
                <label className="text-xs font-medium">Notes</label>
                <textarea
                  rows={4}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Add any initial notes..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1">
            Add Customer
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
