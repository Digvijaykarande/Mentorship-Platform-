"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Upload,
  MessageSquare,
  ChartNoAxesCombined,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  PanelLeft,
  X,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const MENU = [
  ["Overview", "/dashboard", LayoutDashboard],
  ["My Projects", "/dashboard/my-projects", FolderKanban],
  ["Tasks", "/dashboard/tasks", ListTodo],
  ["Submit Work", "/dashboard/submit-work", Upload],
  ["Feedback", "/dashboard/feedback", MessageSquare],
  ["Progress", "/dashboard/progress", ChartNoAxesCombined],
  ["Notification", "/dashboard/notification", Bell],
];

const SETTINGS = [["Setting", "/dashboard/settings", Settings]];

function MenuList({ items, pathname, router }) {
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavigation = (url) => {
    router.push(url);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarMenu className="gap-1">
      {items.map(([title, url, Icon]) => {
        const active =
          url === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === url || pathname.startsWith(`${url}/`);

        return (
          <SidebarMenuItem key={title} className="flex justify-center">
            <SidebarMenuButton
              tooltip={title}
              isActive={active}
              onClick={() => handleNavigation(url)}
              className={`
                relative h-9 w-full cursor-pointer rounded-lg px-2.5 transition-all duration-200
                group-data-[collapsible=icon]:h-9
                group-data-[collapsible=icon]:w-9
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:p-0
                ${
                  active
                    ? "bg-slate-100/80 text-slate-950 shadow-sm dark:bg-slate-800/60 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100/60 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-100"
                }
              `}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.3)] group-data-[collapsible=icon]:hidden" />
              )}

              <Icon
                className={`h-[16px] w-[16px] shrink-0 stroke-[2] transition-transform duration-200 group-hover/menu-button:scale-105 ${
                  active
                    ? "text-slate-950 dark:text-white"
                    : "text-slate-400 dark:text-slate-500 group-hover/menu-button:text-slate-700 dark:group-hover/menu-button:text-slate-200"
                }`}
              />

              <span
                className={`truncate text-xs font-medium group-data-[collapsible=icon]:hidden ${
                  active
                    ? "font-semibold text-slate-950 dark:text-white"
                    : ""
                }`}
              >
                {title}
              </span>

              {active ? (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.4)] group-data-[collapsible=icon]:hidden" />
              ) : (
                <ChevronRight className="ml-auto h-3 w-3 text-slate-400 opacity-0 transition-all duration-200 group-hover/menu-button:translate-x-0.5 group-hover/menu-button:opacity-60 group-data-[collapsible=icon]:hidden" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function Section({ title, children }) {
  return (
    <SidebarGroup className="p-0">
      <SidebarGroupLabel className="mb-1.5 px-2.5 text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400 dark:text-slate-600 group-data-[collapsible=icon]:hidden">
        {title}
      </SidebarGroupLabel>

      <SidebarGroupContent>{children}</SidebarGroupContent>
    </SidebarGroup>
  );
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile, isMobile, toggleSidebar, state } = useSidebar();

  const handleProfileClick = () => {
    router.push("/dashboard/profile");
    if (isMobile) setOpenMobile(false);
  };

  const handleLogoutClick = () => {
    router.push("/login");
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200/60 bg-white/90 backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/80"
    >
      {/* HEADER */}
      <SidebarHeader className="h-14 shrink-0 border-b border-slate-200/60 bg-white/90 px-3 dark:border-slate-700/60 dark:bg-slate-900/80 group-data-[collapsible=icon]:px-2">
        <div className="flex h-full items-center justify-between group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 text-sm font-bold text-white shadow-sm dark:from-slate-200 dark:to-slate-300 dark:text-slate-950">
              L
            </div>

            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-bold tracking-tight text-slate-950 dark:text-white">
                Loyanox
              </p>
              <p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
                Mentor Platform
              </p>
            </div>
          </div>

          {/* Close button for mobile drawers */}
          <div className="md:hidden">
            <SidebarTrigger className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X className="h-4 w-4" />
            </SidebarTrigger>
          </div>
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="gap-4 bg-white/90 px-3 py-4 dark:bg-slate-900/80 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-3">
        <Section title="Platform">
          <MenuList
            items={MENU}
            pathname={pathname}
            router={router}
          />
        </Section>

        <SidebarSeparator className="mx-0 my-0 group-data-[collapsible=icon]:w-8" />

        <Section title="System">
          <MenuList
            items={SETTINGS}
            pathname={pathname}
            router={router}
          />
        </Section>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="shrink-0 border-t border-slate-200/60 bg-white/90 p-2.5 dark:border-slate-700/60 dark:bg-slate-900/80 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-2">
        {/* DESKTOP COLLAPSE TOGGLE */}
        <button
          type="button"
          onClick={toggleSidebar}
          title={state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
          className="mt-1 hidden h-8 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg text-slate-400 transition-colors duration-200 hover:bg-slate-100/60 hover:text-slate-600 md:flex dark:hover:bg-slate-800/40 dark:hover:text-slate-300 group-data-[collapsible=icon]:w-9"
        >
          <PanelLeft
            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
              state === "collapsed" ? "rotate-180" : ""
            }`}
          />
          <span className="text-[10.5px] font-medium group-data-[collapsible=icon]:hidden">
            Collapse
          </span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}