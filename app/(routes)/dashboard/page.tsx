import { fetchCustomers } from "@/lib/api";
import CustomerTable from "@/components/customers/CustomerTable";
import { Users, UserCheck, TrendingUp, UserX, Archive } from "lucide-react";

const Dashboard = async () => {
  const customers = await fetchCustomers();

  const stats = [
    {
      title: "Total Customers",
      value: customers.length,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Active",
      value: customers.filter((c) => c.status === "Active").length,
      icon: UserCheck,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Prospects",
      value: customers.filter((c) => c.status === "Prospect").length,
      icon: TrendingUp,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Inactive",
      value: customers.filter((c) => c.status === "Inactive").length,
      icon: UserX,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Archive",
      value: customers.filter((c) => c.status === "Archive").length,
      icon: Archive,
      color: "text-muted-foreground",
      bg: "bg-muted/50",
    },
  ];

  const recentCustomers = customers.slice(0, 5);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CRM Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back — here&apos;s a snapshot of your customer data.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow duration-200"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <Icon size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  {stat.title}
                </p>
                <h2 className="mt-1 text-3xl font-bold tracking-tight">{stat.value}</h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Customers */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold">Recent Customers</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Latest 5 entries in your CRM</p>
        </div>
        <CustomerTable
          initialCustomers={recentCustomers}
          limit={5}
          hideFilters={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;