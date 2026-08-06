import { fetchCustomers } from "@/lib/api";

export default async function Dashboard() {
  const customers = await fetchCustomers();

  const stats = [
    { title: "Total Customers", value: customers.length },
    { title: "Active", value: customers.filter((c) => c.status === "Active").length },
    { title: "Prospects", value: customers.filter((c) => c.status === "Prospect").length },
    { title: "Inactive", value: customers.filter((c) => c.status === "Inactive").length },
    { title: "Archive", value: customers.filter((c) => c.status === "Archive").length },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">CRM Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-lg border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Recent Customers</h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}