"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, FolderKanban } from "lucide-react";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    icon: CheckCircle2,
    title: "Course completed",
    description: "You completed JavaScript Basics.",
    time: "10 min ago",
    group: "Today",
    category: "Learning",
    accent: "emerald",
    actionLabel: "Milestone",
    unread: true,
  },
  {
    id: 2,
    icon: BookOpen,
    title: "New lesson available",
    description: "A new React lesson is ready for you to start.",
    time: "1 hour ago",
    group: "Today",
    category: "Coursework",
    accent: "blue",
    unread: true,
  },
  {
    id: 3,
    icon: FolderKanban,
    title: "Project update",
    description: "Your project task has been updated by your mentor.",
    time: "3 hours ago",
    group: "Today",
    category: "Mentor activity",
    accent: "violet",
    actionLabel: "Review update",
    unread: true,
  },
  {
    id: 4,
    icon: CheckCircle2,
    title: "Assignment graded",
    description: "Your submission for CSS Layouts was graded.",
    time: "Yesterday",
    group: "Yesterday",
    category: "Assessment",
    accent: "amber",
    unread: false,
  },
  {
    id: 5,
    icon: BookOpen,
    title: "New course added",
    description: "TypeScript Fundamentals is now available.",
    time: "2 days ago",
    group: "Earlier",
    category: "Coursework",
    accent: "blue",
    unread: false,
  },
];

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const toggleRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)),
    );
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => n.unread).length,
      toggleRead,
      deleteNotification,
      markAllRead,
      clearAll,
    }),
    [notifications, toggleRead, deleteNotification, markAllRead, clearAll],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationsProvider");
  }
  return ctx;
}