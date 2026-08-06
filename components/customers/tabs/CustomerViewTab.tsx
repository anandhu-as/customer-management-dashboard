import { Mail, Phone, Building2, Calendar, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Customer, CustomerViewTabProps } from "@/app/types";

export function CustomerViewTab({ customer }: CustomerViewTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Contact Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Mail size={15} className="text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">{customer.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={15} className="text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building2 size={15} className="text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">{customer.company}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={15} className="text-muted-foreground shrink-0" />
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
  );
}