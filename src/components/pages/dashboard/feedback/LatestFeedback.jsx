"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp, CheckCircle2, MessageSquareText } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import FeedbackListItem from "./FeedbackListItem";
import FeedbackDetailContent from "./FeedbackDetailContent";

const PAGE_SIZE = 5;

export default function LatestFeedback({ feedback = [], totalFeedback, selectedId, onSelect, onStatusChange, onAddSuggestion, toolbar }) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sortedFeedback = useMemo(
    () =>
      [...feedback].sort((a, b) => {
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "attention") return Number(b.status === "Action Required") - Number(a.status === "Action Required");
        return b.id.localeCompare(a.id);
      }),
    [feedback, sort],
  );

  const totalPages = Math.max(1, Math.ceil(sortedFeedback.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedFeedback = sortedFeedback.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const selectedItem = sortedFeedback.find((item) => item.id === selectedId) || pagedFeedback[0] || null;
  const resolvedCount = feedback.filter((item) => item.status === "Resolved").length;
  const isFiltered = typeof totalFeedback === "number" && totalFeedback !== feedback.length;

  useEffect(() => {
    setPage(1);
  }, [feedback.length, sort]);

  useEffect(() => {
    if (selectedItem && selectedItem.id !== selectedId) onSelect(selectedItem.id);
  }, [selectedItem, selectedId, onSelect]);

  const handleSelect = (id) => {
    onSelect(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setMobileOpen(true);
  };

  return (
    <SectionCard
      icon={MessageSquareText}
      title="Latest feedback"
      description={isFiltered ? `Showing ${feedback.length} of ${totalFeedback} reviews` : "Select a review to see the full details"}
      iconClassName="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
      action={
        <span className="hidden items-center gap-1 text-[11px] text-slate-400 sm:inline-flex">
          <CheckCircle2 className="size-3 text-emerald-500" aria-hidden="true" />
          {resolvedCount} resolved
        </span>
      }
      contentClassName="p-0"
    >
      {toolbar}

      {feedback.length === 0 ? (
        <div className="p-6">
          <EmptyState icon={MessageSquareText} title="No feedback found" description="Try adjusting your search or filters." />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <div className="flex flex-col border-b border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/30 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-2 px-4 pb-3 pt-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {feedback.length} {feedback.length === 1 ? "review" : "reviews"}
              </p>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger aria-label="Sort feedback" className="h-8 w-[136px] border-slate-200 bg-white text-[11px] dark:border-slate-700 dark:bg-slate-900">
                  <ArrowDownUp className="mr-1.5 size-3 text-slate-400" aria-hidden="true" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="attention">Needs attention</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 px-4 pb-3 lg:max-h-[600px] lg:overflow-y-auto">
              {pagedFeedback.map((item) => (
                <FeedbackListItem key={item.id} item={item} selected={item.id === selectedItem?.id} onClick={() => handleSelect(item.id)} />
              ))}
            </div>

            <div className="mt-auto border-t border-slate-100 p-3 dark:border-slate-800">
              <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>

          <aside className="hidden bg-white p-6 dark:bg-slate-900 lg:block">
            {selectedItem ? (
              <FeedbackDetailContent item={selectedItem} onStatusChange={onStatusChange} onAddSuggestion={onAddSuggestion} />
            ) : (
              <EmptyState icon={MessageSquareText} title="No feedback selected" description="Select an item from the list." className="min-h-[360px]" />
            )}
          </aside>
        </div>
      )}

      <Sheet open={mobileOpen && Boolean(selectedItem)} onOpenChange={setMobileOpen}>
        <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl p-5 lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Feedback details</SheetTitle>
          </SheetHeader>
          {selectedItem && <FeedbackDetailContent item={selectedItem} onStatusChange={onStatusChange} onAddSuggestion={onAddSuggestion} />}
        </SheetContent>
      </Sheet>
    </SectionCard>
  );
}
