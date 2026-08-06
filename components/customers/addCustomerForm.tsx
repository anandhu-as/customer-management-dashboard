"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CustomerFormFields } from "./CustomerFormFields";
import { AddCustomerFormProps } from "@/app/types";


const AddCustomerForm = ({ open, onClose }: AddCustomerFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>
        <Separator />
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <CustomerFormFields />
          <Separator />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Customer</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerForm;