import { Users, Rocket, Phone } from "lucide-react";
import CustomerTable from "@/components/customers/CustomerTable";

const DashboardPage = () => {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your customers today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Customers Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-blue-500/5">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20">
                <Users size={24} className="drop-shadow-md" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">14,782</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                +3.2% ↑
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>
        
        {/* Active Leads Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-orange-500/5">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-3xl transition-all duration-500 group-hover:bg-orange-500/20" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/20">
                <Rocket size={24} className="drop-shadow-md" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Leads</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">3,105</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 font-medium text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                +5.8% ↑
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          </div>
        </div>
        
        {/* Contacted This Week Card */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-pink-500/5">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl transition-all duration-500 group-hover:bg-pink-500/20" />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/5 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)] ring-1 ring-pink-500/20">
                <Phone size={24} className="drop-shadow-md" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Contacted Weekly</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm">947</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center rounded-full bg-red-500/10 px-2 py-1 font-medium text-red-500 ring-1 ring-inset ring-red-500/20">
                -1.5% ↓
              </span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Recent Customers</h2>
            <p className="text-sm text-muted-foreground mt-1">Your most recently added clients and leads.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-sm overflow-hidden p-6">
          <ul className="space-y-4">
            {["Alice Freeman", "Bob Smith", "Charlie Davis", "Diana Prince", "Evan Wright"].map((name, i) => (
              <li key={i} className="flex items-center gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary text-sm font-bold shadow-inner ring-1 ring-primary/20 transition-transform hover:scale-105">
                  {name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="font-medium text-foreground">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
