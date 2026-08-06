import { CustomerFormData } from "../schemas/customer.schema";


export interface AddCustomerFormProps {
  open: boolean;
  onClose: () => void;
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