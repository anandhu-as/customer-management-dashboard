"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AddCustomerForm({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">

                <DialogHeader>
                    <DialogTitle>Add Customer</DialogTitle>
                </DialogHeader>

                <Separator />

                <div className="space-y-3">


                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <Input placeholder="John Doe" className="text-sm" />
                    </div>


                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <Input placeholder="john@example.com" className="text-sm" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <Input placeholder="+1 (555) 123-4567" className="text-sm" />
                    </div>


                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Company</label>
                        <Input placeholder="Acme Corp" className="text-sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Status</label>
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
                            <label className="text-xs text-muted-foreground">Last Contact Date</label>
                            <Input type="date" className="text-sm" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Notes</label>
                        <textarea
                            rows={3}
                            placeholder="Meeting notes and follow-up items..."
                            className="w-full text-sm rounded-md border border-input bg-background px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                </div>

                <Separator />


                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button>
                        Add Customer
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
}