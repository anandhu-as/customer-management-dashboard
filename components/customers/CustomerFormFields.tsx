"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CustomerStatus } from "@/app/types";
import { CustomerFormData } from "@/app/schemas/customer.schema";

interface CustomerFormFieldsProps {
    formData: CustomerFormData;
    onChange: (data: CustomerFormData) => void;
    errors?: Record<string, string>;
}

export const CustomerFormFields = ({
    formData,
    onChange,
    errors = {},
}: CustomerFormFieldsProps) => {
    return (
        <div className="space-y-3">

            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Name <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.name}
                    onChange={(e) => onChange({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="text-sm"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>


            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Email <span className="text-red-500">*</span>
                </label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onChange({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="text-sm"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Phone <span className="text-red-500">*</span>
                </label>
                <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onChange({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="text-sm"
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
            </div>


            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Company <span className="text-red-500">*</span>
                </label>
                <Input
                    value={formData.company}
                    onChange={(e) => onChange({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="text-sm"
                />
                {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <label className="text-xs font-medium">Status</label>
                    <Select
                        value={formData.status}
                        onValueChange={(val) => {
                            if (val) {
                                onChange({ ...formData, status: val as CustomerStatus });
                            }
                        }}
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
                    {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-medium">Last Contact Date</label>
                    <Input
                        type="date"
                        value={formData.lastContactDate}
                        onChange={(e) =>
                            onChange({ ...formData, lastContactDate: e.target.value })
                        }
                        className="text-sm"
                    />
                    {errors.lastContactDate && (
                        <p className="text-xs text-red-500">{errors.lastContactDate}</p>
                    )}
                </div>
            </div>


            <div className="space-y-1">
                <label className="text-xs font-medium">Notes</label>
                <Textarea
                    rows={3}
                    value={formData.notes || ""}
                    onChange={(e) => onChange({ ...formData, notes: e.target.value })}
                    placeholder="Meeting notes and follow-up items..."
                    className="resize-none text-sm"
                />
                {errors.notes && <p className="text-xs text-red-500">{errors.notes}</p>}
            </div>
        </div>
    );
};