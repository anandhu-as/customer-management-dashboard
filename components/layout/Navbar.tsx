"use client";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const currentPathName = usePathname();

  //just to avoid  hydration mismatch
  useEffect(() => setIsMounted(true), []);

  const routeName = currentPathName.split("/").pop() || "Home";

  return (
    <header className="h-16 border-b bg-card flex items-center px-6 shrink-0">

      <h1 className="text-lg font-semibold capitalize tracking-tight">{routeName}</h1>

      <div className="flex items-center gap-2 ml-auto">
        {isMounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="transition-transform duration-300 hover:rotate-12"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-400 transition-all duration-300" />
            ) : (
              <Moon size={18} className="transition-all duration-300" />
            )}
          </Button>
        )}

        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold cursor-pointer">
          A
        </div>

      </div>
    </header>
  );
}
export default Navbar