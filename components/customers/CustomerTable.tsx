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
import { Filter, Plus, ArrowUpDown, Pencil, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { dummyCustomers } from "@/lib/data";
import { statusColors } from "@/app/constants/customer";

const CustomerTable = () => {
  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search by name, email or company..."
          className="max-w-sm"
        />
        <Button variant="outline" size="sm">
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
            {dummyCustomers.map((customer) => (
              <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                      {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
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
                    className={cn("text-xs", statusColors[customer.status])}
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{customer.lastContactDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon">
                      <Pencil size={15} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          {[10, 25, 50].map(size => (
            <button
              key={size}
              className="px-2 py-1 rounded text-xs border hover:bg-muted"
            >
              {size}
            </button>
          ))}
        </div>
        <span>Showing 1–5 of 5</span>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" disabled>«</Button>
          <Button variant="outline" size="sm" disabled>‹</Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm" disabled>›</Button>
          <Button variant="outline" size="sm" disabled>»</Button>
        </div>
      </div>

    </div>
  );
}
export default CustomerTable