"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import { Customer } from "@/app/types";
import { statusColors } from "@/app/constants/customer";

interface CustomerModalProps {
  open: boolean;
  mode?: "view" | "edit" | "delete";
  customer: Customer | null;
  onClose: () => void;
}

export default function CustomerModal({
  open,
  mode = "view",
  customer,
  onClose,
}: CustomerModalProps) {
  const [activeTab, setActiveTab] = useState<"view" | "edit" | "delete">(mode);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    lastContactDate: "",
    notes: "",
  });

  useEffect(() => {
    setActiveTab(mode);
    if (customer) {
      setFormData({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        company: customer.company || "",
        status: customer.status || "Active",
        lastContactDate: customer.lastContactDate || "",
        notes: customer.notes || "",
      });
    }
  }, [mode, open, customer]);

  if (!customer) return null;

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDelete = () => {};

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] overflow-y-auto flex flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle>Customer Details</SheetTitle>
        </SheetHeader>

        <div className="flex border-b">
          <button
            type="button"
            className={cn(
              "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "view"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("view")}
          >
            View
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "edit"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "delete"
                ? "border-red-500 text-red-500"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("delete")}
          >
            Delete
          </button>
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

          {activeTab === "view" && (
            <div className="space-y-6 animate-in fade-in-50">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail
                      size={15}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-muted-foreground">
                      {customer.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone
                      size={15}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-muted-foreground">
                      {customer.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2
                      size={15}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-muted-foreground">
                      {customer.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar
                      size={15}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-muted-foreground">
                      Last contact: {customer.lastContactDate}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText size={15} className="text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Notes</h3>
                </div>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {customer.notes || "No notes recorded for this customer."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "edit" && (
            <form
              id="edit-customer-form"
              onSubmit={handleSaveChanges}
              className="space-y-4 animate-in fade-in-50"
            >
              <h3 className="text-sm font-semibold">Edit Details</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="text-sm"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Company</label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Status</label>
                  <Select value={formData.status}>
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
                <div className="space-y-1">
                  <label className="text-xs font-medium">
                    Last Contact Date
                  </label>
                  <Input
                    type="date"
                    value={formData.lastContactDate}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        lastContactDate: e.target.value,
                      })
                    }
                    className="text-sm"
                  />
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-medium">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={4}
                    className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Add notes about this customer..."
                  />
                </div>
              </div>
            </form>
          )}

          {activeTab === "delete" && (
            <div className="space-y-4 animate-in fade-in-50 pt-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
                <AlertTriangle
                  className="text-red-500 shrink-0 mt-0.5"
                  size={20}
                />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-red-500">
                    Delete Customer
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-foreground">
                      {customer.name}
                    </span>
                    ? This action cannot be undone and will remove all
                    associated data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t flex gap-2">
          {activeTab === "view" && (
            <Button className="w-full" onClick={onClose}>
              Close
            </Button>
          )}

          {activeTab === "edit" && (
            <>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                form="edit-customer-form"
                className="flex-1"
              >
                Save Changes
              </Button>
            </>
          )}

          {activeTab === "delete" && (
            <>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleDelete}
              >
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
                </>
                "Delete Customer"
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
