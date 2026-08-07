import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
export default RoutesLayout