"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Customer, CustomerEditTabProps, CustomerStatus } from "@/app/types";



const  CustomerEditTab=({ customer, onSubmit }: CustomerEditTabProps)=> {
    const [formData, setFormData] = useState({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        company: customer.company || "",
        status: (customer.status as CustomerStatus) || "Active",
        lastContactDate: customer.lastContactDate || "",
        notes: customer.notes || "",
    });

    useEffect(() => {
        setFormData({
            name: customer.name || "",
            email: customer.email || "",
            phone: customer.phone || "",
            company: customer.company || "",
            status: (customer.status as CustomerStatus) || "Active",
            lastContactDate: customer.lastContactDate || "",
            notes: customer.notes || "",
        });
    }, [customer]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form
            id="edit-customer-form"
            onSubmit={handleSubmit}
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
                    <Select
                        value={formData.status}

                    >
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
                    <Input
                        type="date"
                        value={formData.lastContactDate}
                        onChange={(e) =>
                            setFormData({ ...formData, lastContactDate: e.target.value })
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
    );
}
export default CustomerEditTab