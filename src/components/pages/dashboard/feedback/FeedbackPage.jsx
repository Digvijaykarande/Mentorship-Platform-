"use client";

import { useEffect, useMemo, useState } from "react";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackSummary from "./FeedbackSummary";
import FeedbackFilters from "./FeedbackFilters";
import LatestFeedback from "./LatestFeedback";
import FeedbackPagination from "./FeedbackPagination";
import RequestFeedbackDialog from "./RequestFeedbackDialog";
import { INITIAL_FEEDBACK } from "./feedbackData";
import { INITIAL_TASKS } from "../tasks/taskData";
import { addSuggestionToTask, getWorkspace, saveWorkspace, subscribeToWorkspace } from "../workspaceStore";

const INITIAL_FILTERS = { search: "", category: "All Categories", status: "All Statuses" };
const INITIAL_REQUEST_FORM = { mentor: "", subject: "", message: "" };
const PAGE_SIZE = 5;

export default function FeedbackPage() {
  // Keep the first server and client render deterministic. localStorage is
  // loaded after mount so persisted data cannot cause a hydration mismatch.
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [selectedId, setSelectedId] = useState(INITIAL_FEEDBACK[0]?.id ?? null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState(INITIAL_REQUEST_FORM);

  useEffect(() => {
    const workspace = getWorkspace(INITIAL_TASKS, INITIAL_FEEDBACK);
    setFeedback(workspace.feedback);
    setSelectedId(workspace.feedback[0]?.id ?? null);
    if (workspace.changed) {
      saveWorkspace({ tasks: workspace.tasks, feedback: workspace.feedback });
    }
  }, []);

  // Keep feedback and intern tasks synchronized without changing the UI.
  useEffect(
    () =>
      subscribeToWorkspace((workspace) => {
        if (!workspace.feedback?.length) return;
        setFeedback(workspace.feedback);
        setSelectedId((current) =>
          workspace.feedback.some((item) => item.id === current) ? current : workspace.feedback[0].id,
        );
      }),
    [],
  );

  const filteredFeedback = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return feedback.filter((item) => {
      const matchesSearch = !q || [item.title, item.project, item.category, item.mentor, item.id].some((field) => field.toLowerCase().includes(q));
      const matchesCategory = filters.category === "All Categories" || item.category === filters.category;
      const matchesStatus = filters.status === "All Statuses" || item.status === filters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [feedback, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredFeedback.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages); // stays valid if the list shrinks

  const pagedFeedback = useMemo(
    () => filteredFeedback.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredFeedback, currentPage],
  );

  const summary = useMemo(() => {
    const total = feedback.length;
    const newFeedback = feedback.filter((item) => item.status === "In Review").length;
    const actionRequired = feedback.filter((item) => item.status === "Action Required").length;
    const average = total ? (feedback.reduce((sum, item) => sum + item.rating, 0) / total).toFixed(1) : "0.0";
    return { total, newFeedback, actionRequired, average };
  }, [feedback]);

  const updateFilter = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
  };
  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };
  const handlePageChange = (next) => {
    const safe = Math.min(Math.max(next, 1), totalPages);
    setPage(safe);
    // Keep the detail panel in sync with the visible page.
    const first = filteredFeedback[(safe - 1) * PAGE_SIZE];
    if (first) setSelectedId(first.id);
  };
  const handleStatusChange = (id, status) => {
    const nextFeedback = feedback.map((item) => (item.id === id ? { ...item, status } : item));
    setFeedback(nextFeedback);
    const workspace = getWorkspace(INITIAL_TASKS, INITIAL_FEEDBACK);
    saveWorkspace({ tasks: workspace.tasks, feedback: nextFeedback });
  };
  const handleAddSuggestion = (feedbackId, suggestionIndex) => {
    const item = feedback.find((entry) => entry.id === feedbackId);
    if (!item || item.addedSuggestionIds?.includes(suggestionIndex)) return;
    const workspace = getWorkspace(INITIAL_TASKS, INITIAL_FEEDBACK);
    const nextTasks = addSuggestionToTask(workspace.tasks, item, suggestionIndex);
    const nextFeedback = feedback.map((entry) =>
      entry.id === feedbackId
        ? { ...entry, addedSuggestionIds: [...(entry.addedSuggestionIds || []), suggestionIndex] }
        : entry,
    );
    setFeedback(nextFeedback);
    saveWorkspace({ tasks: nextTasks, feedback: nextFeedback });
  };
  const handleOpenRequest = () => {
    setRequestForm(INITIAL_REQUEST_FORM);
    setRequestSent(false);
    setIsRequestOpen(true);
  };
  const handleRequestSubmit = () => {
    if (!requestForm.mentor || !requestForm.subject) return;
    setRequestSent(true);
    setTimeout(() => {
      setIsRequestOpen(false);
      setRequestSent(false);
      setRequestForm(INITIAL_REQUEST_FORM);
    }, 1800);
  };

  return (
    <main className="min-h-full bg-[#f6f8fc] dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl space-y-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <FeedbackHeader totalFeedback={feedback.length} onRequestFeedback={handleOpenRequest} />

        {/* Stat cards intentionally preserved as provided. */}
        <FeedbackSummary
          summary={summary}
          onFilterStatus={(status) => {
            setFilters((current) => (status ? { ...current, status } : INITIAL_FILTERS));
            setPage(1);
          }}
        />

        <LatestFeedback
          feedback={pagedFeedback}
          totalFeedback={feedback.length}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onStatusChange={handleStatusChange}
          onAddSuggestion={handleAddSuggestion}
          toolbar={<FeedbackFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />}
        />

        <FeedbackPagination
          page={currentPage}
          pageSize={PAGE_SIZE}
          total={filteredFeedback.length}
          onPageChange={handlePageChange}
        />

        <RequestFeedbackDialog
          open={isRequestOpen}
          onOpenChange={setIsRequestOpen}
          form={requestForm}
          onFormChange={(key, value) => setRequestForm((previous) => ({ ...previous, [key]: value }))}
          onSubmit={handleRequestSubmit}
          sent={requestSent}
        />
      </div>
    </main>
  );
}
