import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <SidebarInset>
        <DashboardNavbar />

        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-background">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}