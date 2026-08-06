import CustomerTable from "@/components/customers/CustomerTable";
import { fetchCustomers } from "@/lib/api";

const CustomersPage = async () => {
  const initialCustomers = await fetchCustomers();

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <CustomerTable initialCustomers={initialCustomers} />
    </div>
  );
};
export default CustomersPage;
