"use client";

import { useMemo, useState } from "react";
import FeedbackHeader from "./FeedbackHeader";
import FeedbackSummary from "./FeedbackSummary";
import FeedbackFilters from "./FeedbackFilters";
import FeedbackCategories from "./FeedbackCategories";
import LatestFeedback from "./LatestFeedback";
import RequestFeedbackDialog from "./RequestFeedbackDialog";
import { INITIAL_FEEDBACK } from "./feedbackData";

const INITIAL_FILTERS = { search: "", category: "All Categories", status: "All Statuses" };
const INITIAL_REQUEST_FORM = { mentor: "", subject: "", message: "" };

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  const [selectedId, setSelectedId] = useState(INITIAL_FEEDBACK[0]?.id ?? null);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [requestForm, setRequestForm] = useState(INITIAL_REQUEST_FORM);

  const filteredFeedback = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return feedback.filter((item) => {
      const matchesSearch = !q || [item.title, item.project, item.category, item.mentor, item.id].some((f) => f.toLowerCase().includes(q));
      const matchesCategory = filters.category === "All Categories" || item.category === filters.category;
      const matchesStatus = filters.status === "All Statuses" || item.status === filters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [feedback, filters]);

  const summary = useMemo(() => {
    const total = feedback.length;
    const newFeedback = feedback.filter((i) => i.status === "In Review").length;
    const actionRequired = feedback.filter((i) => i.status === "Action Required").length;
    const average = total ? (feedback.reduce((sum, i) => sum + i.rating, 0) / total).toFixed(1) : "0.0";
    return { total, newFeedback, actionRequired, average };
  }, [feedback]);

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const handleFilterFromSummary = (type) => {
    if (type === "action") setFilters((f) => ({ ...f, status: "Action Required" }));
    else if (type === "new") setFilters((f) => ({ ...f, status: "In Review" }));
    else resetFilters();
  };

  const handleStatusChange = (id, status) => {
    setFeedback((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
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
    <div className="mx-auto w-full max-w-[1600px] space-y-5 p-4 sm:p-6 lg:p-8">
      <FeedbackHeader totalFeedback={feedback.length} onRequestFeedback={handleOpenRequest} />

      <FeedbackSummary summary={summary} onFilter={handleFilterFromSummary} />

      <FeedbackFilters filters={filters} onChange={updateFilter} onReset={resetFilters} />

      <FeedbackCategories feedback={feedback} />

      <LatestFeedback
        feedback={filteredFeedback}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onStatusChange={handleStatusChange}
      />

      <RequestFeedbackDialog
        open={isRequestOpen}
        onOpenChange={setIsRequestOpen}
        form={requestForm}
        onFormChange={(key, val) => setRequestForm((prev) => ({ ...prev, [key]: val }))}
        onSubmit={handleRequestSubmit}
        sent={requestSent}
      />
    </div>
  );
}
