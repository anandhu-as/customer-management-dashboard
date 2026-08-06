import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "@/lib/api";
import { Customer } from "@/app/types";

//keyy to identify catched data
export const CUSTOMERS_QUERY_KEY = ["customers"];

export const useGetCustomers = (initialData?: Customer[]) => {
  return useQuery({
    queryKey: CUSTOMERS_QUERY_KEY,
    queryFn: fetchCustomers,
    initialData,
  });
};

export const useAddCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCustomer: Omit<Customer, "id">) => addCustomer(newCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Customer> }) => updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_QUERY_KEY });
    },
  });
};