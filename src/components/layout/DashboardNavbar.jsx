"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Check, LogOut, Search, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/common/ThemeToggle";
import { useNotifications } from "@/hooks/NotificationsProvider";

const NOTIFICATIONS_PATH = "/dashboard/notification";

const ACCENT_COLORS = {
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
};

/** Maps each dashboard route to its page title and subtitle shown in the top bar. */
const PAGE_META = {
  "/dashboard": { title: "Overview", subtitle: "Welcome back to Loyanox Mentor" },
  "/dashboard/my-projects": { title: "My Projects", subtitle: "Track your sprints and milestones" },
  "/dashboard/tasks": { title: "Tasks", subtitle: "Manage your assigned tasks" },
  "/dashboard/submit-work": { title: "Submit Work", subtitle: "Share your work with your mentor" },
  "/dashboard/feedback": { title: "Feedback", subtitle: "Mentor reviews and suggestions" },
  "/dashboard/progress": { title: "Progress", subtitle: "Your internship progress at a glance" },
  "/dashboard/notification": { title: "Notifications", subtitle: "Stay on top of your updates" },
  "/dashboard/settings": { title: "Settings", subtitle: "Manage your account preferences" },
  "/dashboard/profile": { title: "Profile", subtitle: "Your personal profile" },
};

const btnClass = "h-9 w-9 cursor-pointer rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center transition dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white";

function NotificationMenu({ router }) {
  const { notifications, unreadCount, toggleRead, markAllRead } = useNotifications();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const visible = notifications.filter((n) => (filter === "unread" ? n.unread : true));

  const goToNotifications = () => {
    setOpen(false);
    router.push(NOTIFICATIONS_PATH);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger render={
        <button type="button" aria-label="Notifications" className={`${btnClass} relative`}>
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute right-0.5 top-0.5 h-3.5 min-w-3.5 rounded-full bg-red-500 p-0 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-950" style={{ width: "36%", right: "8px" }}>
              {unreadCount}
            </Badge>
          )}
        </button>
      } />
      <DropdownMenuContent align="end" sideOffset={8} className="w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-0 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800/80">
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Notifications{" "}
            {unreadCount > 0 && (
              <span className="ml-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                {unreadCount} new
              </span>
            )}
          </span>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-[10px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Mark all read
            </button>
          )}
        </div>

        <div className="flex gap-1 border-b border-slate-100 bg-slate-50/50 px-3 py-1.5 dark:border-slate-800/80 dark:bg-slate-900/30">
          {["all", "unread"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-2 py-0.5 text-[10px] capitalize transition ${
                filter === f
                  ? "bg-white font-semibold text-slate-900 shadow-xs dark:bg-slate-800 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400"
              }`}
            >
              {f} ({f === "all" ? notifications.length : unreadCount})
            </button>
          ))}
        </div>

        <div className="max-h-64 overflow-y-auto p-2 space-y-1">
          {visible.length === 0 && (
            <p className="px-2 py-6 text-center text-xs text-slate-400">
              {filter === "unread" ? "No unread notifications" : "You're all caught up"}
            </p>
          )}
          {visible.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={goToNotifications}
                className={`group flex cursor-pointer items-start gap-3 rounded-xl p-2.5 transition ${
                  !item.unread
                    ? "opacity-60 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    : "bg-slate-50/80 hover:bg-slate-100/80 dark:bg-slate-900/40 dark:hover:bg-slate-800/80"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${ACCENT_COLORS[item.accent] || ACCENT_COLORS.blue}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    {item.unread && <span className="h-2 w-2 rounded-full bg-blue-600" />}
                  </div>
                  <p className="line-clamp-1 text-[11px] text-slate-500 dark:text-slate-400">{item.description}</p>
                  <span className="text-[10px] text-slate-400">{item.time}</span>
                </div>
                <button
                  type="button"
                  aria-label={item.unread ? "Mark as read" : "Mark as unread"}
                  onClick={(e) => { e.stopPropagation(); toggleRead(item.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="p-2 border-t border-slate-100 bg-slate-50/50 dark:border-slate-800/80 dark:bg-slate-900/50">
          <Button variant="ghost" onClick={goToNotifications} className="h-7 w-full text-xs font-semibold text-slate-600 dark:text-slate-300">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ProfileMenu({ router }) {
  const profileItems = [
    { label: "My Profile", icon: User, path: "/dashboard/profile" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <button type="button" aria-label="Account menu" className="group flex shrink-0 cursor-pointer items-center outline-none">
          <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all group-hover:ring-slate-200 group-data-popup-open:ring-slate-900/10 dark:group-hover:ring-slate-700 dark:group-data-popup-open:ring-white/10">
            <AvatarFallback className="bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">D</AvatarFallback>
            <AvatarBadge className="bg-emerald-500 ring-white dark:ring-slate-950" />
          </Avatar>
        </button>
      } />
      <DropdownMenuContent align="end" sideOffset={10} className="w-52 rounded-2xl p-1.5 dark:border-slate-800">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2.5 px-2 py-2 font-normal">
            <Avatar size="sm">
              <AvatarFallback className="bg-slate-900 text-[11px] font-bold text-white dark:bg-white dark:text-slate-900">D</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">Digvijay</p>
              <p className="truncate text-[10px] text-slate-400">Intern</p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {profileItems.map(({ label, icon: Icon, path }) => (
          <DropdownMenuItem key={label} onClick={() => router.push(path)} className="cursor-pointer rounded-xl px-2.5 py-1.5 text-xs font-medium">
            <Icon className="mr-2 h-3.5 w-3.5 text-slate-500" />{label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push("/auth/login")}
          className="cursor-pointer rounded-xl px-2.5 py-1.5 text-xs font-medium text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30"
        >
          <LogOut className="mr-2 h-3.5 w-3.5" />Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const isSearchExpanded = isSearchFocused || searchValue.length > 0;

  // Resolve current page title from the pathname
  const pageMeta = PAGE_META[pathname] ?? { title: "Dashboard", subtitle: "Welcome back to Loyanox Mentor" };

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full shrink-0 items-center border-b border-slate-200/80 bg-white/95 px-2 backdrop-blur-xl sm:px-2 md:px-2 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <SidebarTrigger className={btnClass} />
          <Separator orientation="vertical" className="hidden h-6 sm:block dark:bg-slate-800" />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-950 dark:text-white">{pageMeta.title}</h1>
            <p className="hidden truncate text-[10px] text-slate-400 md:block">{pageMeta.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reserve the max width up front (right-aligned) so expansion never shoves sibling icons */}
          <div className="relative hidden h-9 md:block md:w-56 lg:w-64">
            <div
              className={`absolute right-0 top-0 flex h-9 items-center transition-[width] duration-300 ease-in-out ${
                isSearchExpanded ? "w-[28rem]" : "w-40 lg:w-56"
              }`}
            >
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search..."
                className={`h-9 w-full rounded-xl border-slate-200/80 bg-slate-50 pl-9 text-xs transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
                  isSearchExpanded
                    ? "border-slate-300 bg-white shadow-sm ring-2 ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950"
                    : ""
                }`}
              />
              <Search
                className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-300 ${
                  isSearchExpanded ? "text-slate-600 dark:text-slate-300" : "text-slate-400"
                }`}
              />
            </div>
          </div>

          <button type="button" aria-label="Search" className={`${btnClass} md:hidden`}>
            <Search className="h-4 w-4" />
          </button>

          <NotificationMenu router={router} />
          <ThemeToggle />
          <Separator orientation="vertical" className="hidden h-6 sm:block dark:bg-slate-800" />

          <ProfileMenu router={router} />
        </div>
      </div>
    </header>
  );
}