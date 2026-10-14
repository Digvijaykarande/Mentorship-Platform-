import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardNavbar from "@/components/layout/DashboardNavbar";
import { NotificationsProvider } from "@/hooks/NotificationsProvider";

import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <NotificationsProvider>
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset>
          <DashboardNavbar />

          <main className="min-h-[calc(100vh-3.5rem)] bg-slate-50 dark:bg-background">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </NotificationsProvider>
  );
}