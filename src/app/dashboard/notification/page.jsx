"use client";

import { useState } from "react";
import { Bell, BookOpen, CheckCircle2, FolderKanban, CheckCheck, Trash2 } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import SectionCard from "@/components/common/SectionCard";
import FilterTabs from "@/components/common/FilterTabs";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import NotificationList from "@/components/pages/dashboard/notification/NotificationList";

const INITIAL_NOTIFICATIONS = [
  { id: 1, icon: CheckCircle2, title: "Course completed", description: "You completed JavaScript Basics.", time: "10 min ago", unread: true },
  { id: 2, icon: BookOpen, title: "New lesson available", description: "A new React lesson is ready for you to start.", time: "1 hour ago", unread: true },
  { id: 3, icon: FolderKanban, title: "Project update", description: "Your project task has been updated by your mentor.", time: "3 hours ago", unread: true },
  { id: 4, icon: CheckCircle2, title: "Assignment graded", description: "Your submission for CSS Layouts was graded.", time: "Yesterday", unread: false },
  { id: 5, icon: BookOpen, title: "New course added", description: "TypeScript Fundamentals is now available.", time: "2 days ago", unread: false },
];

const FILTERS = [
  { value: "all", label: "all" },
  { value: "unread", label: "unread" },
  { value: "read", label: "read" },
];

const PAGE_SIZE = 4;

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const toggleRead = (id) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)));

  const requestDelete = (notification) => setPendingDelete(notification);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    setNotifications((prev) => prev.filter((n) => n.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  const changeFilter = (value) => {
    setFilter(value);
    setPage(1);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.unread;
    if (filter === "read") return !n.unread;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredNotifications.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedNotifications = filteredNotifications.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <PageHeader title="Notifications" subtitle="Stay updated with your courses, projects, and assignments">
        <Button type="button" variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0} className="gap-1.5">
          <CheckCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          Mark all as read
        </Button>
      </PageHeader>

      <SectionCard
        icon={Bell}
        title="All Notifications"
        description={`${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`}
        action={<FilterTabs options={FILTERS} value={filter} onChange={changeFilter} />}
        contentClassName="space-y-4 p-5"
      >
        <NotificationList
          notifications={pagedNotifications}
          filter={filter}
          onToggleRead={toggleRead}
          onDelete={requestDelete}
        />

        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </SectionCard>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        icon={Trash2}
        title="Delete Notification"
        description={pendingDelete ? `Are you sure you want to delete "${pendingDelete.title}"? This can't be undone.` : ""}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />
    </div>
  );
}

