import { Customer } from "@/app/types";
import { dummyCustomers } from "@/lib/data";
//storing dummydata in arrary , to do mutations
let customersData: Customer[] = [...dummyCustomers];

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCustomers = async (): Promise<Customer[]> => {
  await delay(); 
  return [...customersData];
};

export const addCustomer = async (newCustomerData: Omit<Customer, "id">): Promise<Customer> => {
  await delay();
  const newCustomer: Customer = {
    ...newCustomerData,
    id: `CUST-${Math.floor(Math.random() * 10000)}`,
  };
  customersData = [newCustomer, ...customersData];
  return newCustomer;
};

export const updateCustomer = async (id: string, updatedData: Partial<Customer>): Promise<Customer> => {
  await delay();
  const index = customersData.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Customer not found");
  
  customersData[index] = { ...customersData[index], ...updatedData };
  return customersData[index];
};

export const deleteCustomer = async (id: string): Promise<string> => {
  await delay();
  customersData = customersData.filter((c) => c.id !== id);
  return id;
};