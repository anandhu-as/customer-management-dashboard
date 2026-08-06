import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusColors } from "@/app/constants/customer";
import { Customer } from "@/app/types";

interface CustomerTableRowProps {
  customer: Customer;
  onOpenModal: (mode: "view" | "edit" | "delete", customer: Customer) => void;
}

export default function CustomerTableRow({
  customer,
  onOpenModal,
}: CustomerTableRowProps) {
  return (
    <TableRow
      className="cursor-pointer border-b border-white/5 transition-all hover:bg-white/5 data-[state=selected]:bg-white/5 group"
      onClick={() => onOpenModal("view", customer)}
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
              <DropdownMenuItem onClick={() => onOpenModal("view", customer)}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Show</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenModal("edit", customer)}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onOpenModal("delete", customer)}
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
  );
}
