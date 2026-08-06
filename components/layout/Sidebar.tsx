"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Customers", href: "/customers", icon: Users },
];

 const Sidebar=()=> {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-card flex flex-col h-screen shrink-0">

      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-xl font-bold tracking-tight">CRM</span>
      </div>

  
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

   
      <div className="px-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            A
          </div>
          <div className="text-sm">
            <p className="font-medium">Anandhu</p>
            <p className="text-muted-foreground text-xs">SDE 1</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default Sidebar