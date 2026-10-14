"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import ConfirmDialog from "@/components/common/ConfirmDialog";
import Pagination from "@/components/common/Pagination";
import NotificationList from "@/components/pages/dashboard/notification/NotificationList";
import { useNotifications } from "@/hooks/NotificationsProvider";

const PAGE_SIZE = 4;

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    toggleRead,
    deleteNotification,
    markAllRead,
    clearAll,
  } = useNotifications();

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const requestDelete = (notification) => setPendingDelete(notification);
  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteNotification(pendingDelete.id);
    setPendingDelete(null);
  };
  const confirmDeleteAll = () => {
    clearAll();
    setConfirmClearAll(false);
    setPage(1);
  };

  const filteredNotifications = notifications.filter((notification) =>
    filter === "unread"
      ? notification.unread
      : filter === "read"
        ? !notification.unread
        : true,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const pagedNotifications = filteredNotifications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <NotificationList
        notifications={pagedNotifications}
        totalCount={notifications.length}
        unreadCount={unreadCount}
        filter={filter}
        onFilterChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        onToggleRead={toggleRead}
        onDelete={requestDelete}
        onMarkAllRead={markAllRead}
        onClearAll={() => setConfirmClearAll(true)}
      />

      {filteredNotifications.length > PAGE_SIZE && (
        <div className="flex justify-center">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        icon={Trash2}
        title="Delete Notification"
        description={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.title}"? This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
      />

      <ConfirmDialog
        open={confirmClearAll}
        onOpenChange={setConfirmClearAll}
        icon={Trash2}
        title="Delete All Notifications"
        description="Are you sure you want to delete all notifications? This can't be undone."
        confirmLabel="Delete all"
        onConfirm={confirmDeleteAll}
      />
    </div>
  );
}