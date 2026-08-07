import { CustomerFormData } from "../schemas/customer.schema";


export interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: CustomerFormData) => void;
}

///zod schema + 2 properties
export interface Customer extends CustomerFormData {
  id: string;
  createdAt?: string;
}
//for zus store
export interface CustomerStore {
  customers: Customer[];
  addCustomer: (data: CustomerFormData) => void;
}

export interface CustomerViewTabProps {
  customer: Customer;
}
export  type CustomerStatus = "Active" | "Inactive" | "Prospect" | "Archive";

export interface CustomerEditTabProps {
    customer: Customer;
    onSubmit: (formData: any) => void;
}
export interface CustomerFormFieldsProps {
    formData: CustomerFormData;
    onChange: (data: CustomerFormData) => void;
    errors?: Record<string, string>;
}
export interface CustomerModalProps {
  open: boolean;
  mode?: "view" | "edit" | "delete";
  customer: Customer | null;
  onClose: () => void;
}
export interface CustomerTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}
export interface CustomerTableRowProps {
  customer: Customer;
  onOpenModal: (mode: "view" | "edit" | "delete", customer: Customer) => void;
}

export interface CustomerTableToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilterCount: number;
  onOpenFilterPanel: () => void;
  onAddCustomer: () => void;
  displayedCustomers: Customer[];
}

export type FilterCriteria = {
  statuses: string[];
  companies: string[];
  dateFrom: string;
  dateTo: string;
  phone: string;
  email: string;
};
