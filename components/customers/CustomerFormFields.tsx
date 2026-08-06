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

export const CustomerFormFields = () => {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="John Doe" className="text-sm" />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Email <span className="text-red-500">*</span>
                </label>
                <Input type="email" placeholder="john@example.com" className="text-sm" />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Phone <span className="text-red-500">*</span>
                </label>
                <Input type="tel" placeholder="+1 (555) 123-4567" className="text-sm" />
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium">
                    Company <span className="text-red-500">*</span>
                </label>
                <Input placeholder="Acme Corp" className="text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                    <label className="text-xs font-medium">Status</label>
                    <Select defaultValue="Active">
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
                    <Input type="date" className="text-sm" />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs font-medium">Notes</label>
                <Textarea
                    rows={3}
                    placeholder="Meeting notes and follow-up items..."
                    className="resize-none text-sm"
                />
            </div>
        </div>
    );
};