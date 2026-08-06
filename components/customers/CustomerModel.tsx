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
import { Pencil, Trash2, Mail, Phone, Building2, Calendar, FileText, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const statusColors: Record<string, string> = {
  Active: "bg-green-500/20 text-green-600 border-green-500/30",
  Inactive: "bg-red-500/20 text-red-600 border-red-500/30",
  Prospect: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30",
  Archive: "bg-gray-500/20 text-gray-500 border-gray-500/30",
};


const dummyCustomer = {
  id: "1",
  name: "Alice Green",
  email: "alice@example.com",
  phone: "+1 (874) 748-8877",
  company: "Acme Corp",
  status: "Active",
  lastContactDate: "2024-01-12",
  notes: "Met at TechCrunch. Discussed Q4 plans. Follow up next week.",
};

export default function CustomerModal({
  open,
  mode = "view",
  onClose,
}: {
  open: boolean;
  mode?: "view" | "edit" | "delete";
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"view" | "edit" | "delete">(mode);

  useEffect(() => {
    setActiveTab(mode);
  }, [mode, open]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[400px] overflow-y-auto flex flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="px-5 py-4 border-b">
          <SheetTitle>Customer Details</SheetTitle>
        </SheetHeader>

        <div className="flex border-b">
          <button
            className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "view" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}
            onClick={() => setActiveTab("view")}
          >
            View
          </button>
          <button
            className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "edit" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
          <button
            className={cn("flex-1 py-3 text-sm font-medium border-b-2 transition-colors", activeTab === "delete" ? "border-red-500 text-red-500" : "border-transparent text-muted-foreground hover:text-foreground")}
            onClick={() => setActiveTab("delete")}
          >
            Delete
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold shrink-0">
              {dummyCustomer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-semibold">{dummyCustomer.name}</h2>
              <Badge
                variant="outline"
                className={cn("text-xs mt-1", statusColors[dummyCustomer.status])}
              >
                {dummyCustomer.status}
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
                    <Mail size={15} className="text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{dummyCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={15} className="text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{dummyCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 size={15} className="text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">{dummyCustomer.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={15} className="text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Last contact: {dummyCustomer.lastContactDate}</span>
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
                  {dummyCustomer.notes}
                </p>
              </div>
            </div>
          )}

          {activeTab === "edit" && (
            <div className="space-y-4 animate-in fade-in-50">
              <h3 className="text-sm font-semibold">Edit Details</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Name</label>
                  <Input defaultValue={dummyCustomer.name} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Email</label>
                  <Input defaultValue={dummyCustomer.email} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Phone</label>
                  <Input defaultValue={dummyCustomer.phone} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Company</label>
                  <Input defaultValue={dummyCustomer.company} className="text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Status</label>
                  <Select defaultValue={dummyCustomer.status}>
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
                  <label className="text-xs font-medium">Last Contact Date</label>
                  <Input type="date" defaultValue={dummyCustomer.lastContactDate} className="text-sm" />
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-xs font-medium">Notes</label>
                  <textarea
                    defaultValue={dummyCustomer.notes}
                    rows={4}
                    className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Add notes about this customer..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "delete" && (
            <div className="space-y-4 animate-in fade-in-50 pt-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-red-800">Delete Customer</h4>
                  <p className="text-sm text-red-600">
                    Are you sure you want to delete {dummyCustomer.name}? This action cannot be undone and will remove all associated data.
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
              <Button className="flex-1">
                Save Changes
              </Button>
            </>
          )}
          {activeTab === "delete" && (
            <>
              <Button variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1">
                Delete Customer
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}