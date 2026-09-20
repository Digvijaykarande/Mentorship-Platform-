"use client";

import { Inbox } from "lucide-react";
import EmptyState from "@/components/common/EmptyState";
import NotificationRow from "./NotificationRow";

export default function NotificationList({ notifications, filter, onToggleRead, onDelete }) {
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No notifications found"
        description={
          filter === "unread"
            ? "You have no unread notifications right now."
            : "You're all caught up! Check back later."
        }
      />
    );
  }

  return (
    <div className="space-y-2.5">
      {notifications.map((notification) => (
        <NotificationRow
          key={notification.id}
          notification={notification}
          onToggleRead={onToggleRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
