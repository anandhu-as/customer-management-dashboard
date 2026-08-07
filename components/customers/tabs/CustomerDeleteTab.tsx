import { AlertTriangle } from "lucide-react";
import { Customer } from "@/app/types";

interface CustomerDeleteTabProps {
  customer: Customer;
}

const CustomerDeleteTab=({ customer }: CustomerDeleteTabProps)=> {
  return (
    <div className="space-y-4 animate-in fade-in-50 pt-4">
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
        <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-red-500">
            Delete Customer
          </h4>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">
              {customer.name}
            </span>
            ? This action cannot be undone and will remove all associated data.
          </p>
        </div>
      </div>
    </div>
  );
}
export default CustomerDeleteTab