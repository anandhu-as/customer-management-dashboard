
import { Customer } from "@/app/types";
import { dummyCustomers } from "@/lib/data";
//storing dummydata in arrary , to do mutations
let customersData: Customer[] = [...dummyCustomers];


const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCustomers = async (): Promise<Customer[]> => {
  await delay(); 
  return [...customersData];
};