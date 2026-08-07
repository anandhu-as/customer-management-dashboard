"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Customer, CustomerModalProps } from "@/app/types";
import { statusColors } from "@/app/constants/customer";
import { cn } from "@/lib/utils";

import { useUpdateCustomer, useDeleteCustomer } from "@/app/hooks/useCustomers";
import CustomerViewTab from "./tabs/CustomerViewTab";
import CustomerEditTab from "./tabs/CustomerEditTab";
import CustomerDeleteTab from "./tabs/CustomerDeleteTab";




export default function CustomerModal({
  open,
  mode = "view",
  customer,
  onClose,
}: CustomerModalProps) {
  const [activeTab, setActiveTab] = useState<"view" | "edit" | "delete">(mode);



  useEffect(() => {
    setActiveTab(mode);
  }, [mode, open]);

  const { mutate: updateCustomer, isPending: isUpdating } = useUpdateCustomer();
  const { mutate: deleteCustomer, isPending: isDeleting } = useDeleteCustomer();

  if (!customer) return null;

  const handleUpdate = (formData: any) => {
    updateCustomer({ id: customer.id, data: formData }, {
      onSuccess: () => {
        toast.success("Customer updated successfully!");
        onClose();
      },
      onError: () => {
        toast.error("Failed to update customer. Please try again.");
      }
    });
  };

  const handleDelete = () => {
    deleteCustomer(customer.id, {
      onSuccess: () => {
        toast.success("Customer deleted successfully!");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete customer. Please try again.");
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] overflow-y-auto flex flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle>Customer Details</SheetTitle>
        </SheetHeader>


        <div className="flex border-b">
          {(["view", "edit", "delete"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize",
                activeTab === tab
                  ? tab === "delete"
                    ? "border-red-500 text-red-500"
                    : "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>


        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold shrink-0">
              {customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{customer.name}</h2>
              <Badge
                variant="outline"
                className={cn("text-xs mt-1", statusColors[customer.status])}
              >
                {customer.status}
              </Badge>
            </div>
          </div>

          <Separator />

          {activeTab === "view" && <CustomerViewTab customer={customer} />}
          {activeTab === "edit" && (
            <CustomerEditTab customer={customer} onSubmit={handleUpdate} />
          )}
          {activeTab === "delete" && <CustomerDeleteTab customer={customer} />}
        </div>

      
        <div className="px-5 py-4 border-t flex gap-2">
          {activeTab === "view" && (
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          )}

          {activeTab === "edit" && (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}

              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-customer-form"
                className="flex-1"
                disabled={isUpdating}
              >
                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </>
          )}

          {activeTab === "delete" && (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
              
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Delete Customer
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}