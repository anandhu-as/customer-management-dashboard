"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomerFormFields } from "./CustomerFormFields";
import { AddCustomerFormProps } from "@/app/types";
import { CustomerFormData, customerSchema } from "@/app/schemas/customer.schema";
import { useAddCustomer } from "@/app/hooks/useCustomers";
import { toast } from "sonner";

import { Loader2 } from "lucide-react"; const INITIAL_FORM_DATA: CustomerFormData = {
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    lastContactDate: "",
    notes: "",
};

const AddCustomerForm = ({ open, onClose, onSubmit }: AddCustomerFormProps) => {
    const [formData, setFormData] = useState<CustomerFormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { mutate: addCustomer, isPending } = useAddCustomer();

    const handleResetAndClose = () => {
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = customerSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0];
                if (path) {
                    fieldErrors[path.toString()] = issue.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        addCustomer(result.data, {
            onSuccess: () => {
                toast.success("Customer added successfully!");
                if (onSubmit) onSubmit(result.data);
                handleResetAndClose();
            },
            onError: () => {
                toast.error("Failed to add customer. Please try again.");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleResetAndClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Customer</DialogTitle>
                </DialogHeader>
                <Separator />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CustomerFormFields
                        formData={formData}
                        onChange={(newData) => {
                            setFormData(newData);
                            if (Object.keys(errors).length > 0) setErrors({});
                        }}
                        errors={errors}
                    />
                    <Separator />
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={handleResetAndClose} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Add Customer
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddCustomerForm;