"use client";

import { useEffect, useState } from "react";
import { MessageSquareText, Sparkles } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import FeedbackListItem from "./FeedbackListItem";
import FeedbackDetailContent from "./FeedbackDetailContent";

const PAGE_SIZE = 6;

export default function LatestFeedback({ feedback = [], selectedId, onSelect, onStatusChange }) {
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  const selectedItem = feedback.find((f) => f.id === selectedId) || null;
  const totalPages = Math.max(1, Math.ceil(feedback.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedFeedback = feedback.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSelect = (id) => {
    onSelect(id);
    // Only pop the bottom sheet on small screens — on lg+ the inline
    // desktop panel already shows the detail, so opening the sheet too
    // would trigger its backdrop blur behind the (hidden) sheet content.
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileOpen(true);
    }
  };

  // If the viewport grows to desktop width while the sheet is open
  // (e.g. rotating a tablet, resizing a window), close it so its
  // backdrop blur doesn't linger behind the now-visible desktop panel.
  useEffect(() => {
    if (!mobileOpen) return;
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  return (
    <SectionCard
      icon={MessageSquareText}
      title="Latest Feedback"
      description={`${feedback.length} ${feedback.length === 1 ? "review" : "reviews"} recorded`}
      iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
      action={
        <Badge className="gap-1 rounded-full bg-indigo-50 text-[10.5px] font-semibold text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Sparkles className="h-3 w-3" /> Live Feed
        </Badge>
      }
      contentClassName="p-0"
    >
      {feedback.length === 0 ? (
        <div className="p-5">
          <EmptyState icon={MessageSquareText} title="No feedback entries found" description="Try adjusting your search terms or filters." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_1fr]">
          {/* LIST */}
          <div className="flex flex-col gap-2.5 border-slate-100 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/30 lg:border-r">
            <div className="space-y-1.5 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
              {pagedFeedback.map((item) => (
                <FeedbackListItem key={item.id} item={item} selected={item.id === selectedId} onClick={() => handleSelect(item.id)} />
              ))}
            </div>
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </div>

          {/* DESKTOP DETAIL */}
          <aside className="hidden bg-white p-6 dark:bg-slate-900 lg:block">
            {selectedItem ? (
              <FeedbackDetailContent item={selectedItem} onStatusChange={onStatusChange} />
            ) : (
              <EmptyState icon={MessageSquareText} title="No Feedback Selected" description="Select an item from the list to inspect details." className="min-h-[320px]" />
            )}
          </aside>
        </div>
      )}

      {/* MOBILE SHEET */}
      <Sheet open={mobileOpen && Boolean(selectedItem)} onOpenChange={setMobileOpen}>
        <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Feedback details</SheetTitle>
          </SheetHeader>
          {selectedItem && <FeedbackDetailContent item={selectedItem} onStatusChange={onStatusChange} />}
        </SheetContent>
      </Sheet>
    </SectionCard>
  );
}
