
import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "@/lib/api";

//keyy to identify catched data
export const CUSTOMERS_QUERY_KEY = ["customers"];

export const useGetCustomers = () => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: fetchCustomers,
  });
};