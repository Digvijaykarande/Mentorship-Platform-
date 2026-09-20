"use client";

import { CheckCircle2, MessageSquarePlus, Send, X } from "lucide-react";
import { useMemo, useState } from "react";

import FeedbackCategories from "@/components/pages/dashboard/feedback/FeedbackCategories";
import FeedbackHeader from "@/components/pages/dashboard/feedback/FeedbackHeader";
import FeedbackSummary from "@/components/pages/dashboard/feedback/FeedbackSummary";
import LatestFeedback from "@/components/pages/dashboard/feedback/LatestFeedback";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_FEEDBACK = [
  {
    id: "FB-1048",
    title: "Dashboard UI Implementation",
    project: "Intern Dashboard",
    category: "Code Quality",
    mentor: "Rahul Patil",
    role: "Frontend Mentor",
    rating: 4.8,
    status: "Resolved",
    date: "Aug 29, 2026",
    summary: "Strong component structure with clean responsive implementation.",
    strengths: [
      "Good use of reusable React components.",
      "Responsive layouts are consistent across screen sizes.",
      "Tailwind utility classes are organized clearly.",
    ],
    improvements: [
      "Consider extracting repeated spacing patterns.",
      "Add a few more empty and loading states.",
    ],
    breakdown: [
      { label: "Code Quality", value: 5 },
      { label: "UI Implementation", value: 4.8 },
      { label: "Responsiveness", value: 4.6 },
    ],
  },
  {
    id: "FB-1045",
    title: "API Integration",
    project: "Intern Dashboard",
    category: "System Design",
    mentor: "Ananya Sharma",
    role: "Backend Mentor",
    rating: 4.5,
    status: "In Review",
    date: "Aug 28, 2026",
    summary: "API integration is working well with appropriate loading and error handling.",
    strengths: [
      "Endpoints are integrated correctly.",
      "Error states have been handled cleanly.",
    ],
    improvements: [
      "Improve API error messages shown to users.",
      "Consider creating a reusable API service layer.",
    ],
    breakdown: [
      { label: "Architecture", value: 4.5 },
      { label: "API Handling", value: 4.6 },
      { label: "Error Handling", value: 4.3 },
    ],
  },
  {
    id: "FB-1042",
    title: "Login & Registration UI",
    project: "Authentication Module",
    category: "UI / UX",
    mentor: "Priya Sharma",
    role: "UI/UX Mentor",
    rating: 4.2,
    status: "Action Required",
    date: "Aug 26, 2026",
    summary: "The authentication flow is complete, but mobile spacing and validation states need refinement.",
    strengths: [
      "Clean visual hierarchy.",
      "Password visibility interaction is implemented well.",
    ],
    improvements: [
      "Improve spacing on smaller screens.",
      "Add clearer validation feedback for form fields.",
      "Review keyboard navigation and accessibility states.",
    ],
    breakdown: [
      { label: "Visual Design", value: 4.5 },
      { label: "Accessibility", value: 3.8 },
      { label: "Responsive UI", value: 4.2 },
    ],
  },
  {
    id: "FB-1039",
    title: "Project Documentation",
    project: "Intern Dashboard",
    category: "Code Quality",
    mentor: "Rahul Patil",
    role: "Frontend Mentor",
    rating: 4.9,
    status: "Resolved",
    date: "Aug 24, 2026",
    summary: "Clear documentation with useful setup and development instructions.",
    strengths: [
      "Project setup is easy to understand.",
      "Component documentation is concise and useful.",
    ],
    improvements: ["Add a short troubleshooting section."],
    breakdown: [
      { label: "Clarity", value: 5 },
      { label: "Completeness", value: 4.9 },
      { label: "Organization", value: 4.8 },
    ],
  },
  {
    id: "FB-1035",
    title: "Testing & Validation",
    project: "Task Module",
    category: "Testing",
    mentor: "Ananya Sharma",
    role: "Technical Mentor",
    rating: 4.7,
    status: "Resolved",
    date: "Aug 22, 2026",
    summary: "Good validation coverage with a few opportunities for additional edge-case testing.",
    strengths: [
      "Core user flows are covered.",
      "Validation behavior is predictable.",
    ],
    improvements: [
      "Add more edge-case tests.",
      "Include negative API response scenarios.",
    ],
    breakdown: [
      { label: "Coverage", value: 4.7 },
      { label: "Edge Cases", value: 4.5 },
      { label: "Reliability", value: 4.8 },
    ],
  },
];

const INITIAL_REQUEST_FORM = { mentor: "", subject: "", message: "" };

export default function FeedbackPage() {
  const [feedback] = useState(INITIAL_FEEDBACK);
  const [selectedId, setSelectedId] = useState(INITIAL_FEEDBACK[0].id);

  // Filter States
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    status: "All Statuses",
  });

  // Modal States
  const [modalState, setModalState] = useState({ open: false, sent: false });
  const [feedbackRequest, setFeedbackRequest] = useState(INITIAL_REQUEST_FORM);

  const filteredFeedback = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return feedback.filter((item) => {
      const matchesSearch =
        !q ||
        [item.title, item.project, item.category, item.mentor, item.id].some(
          (field) => field.toLowerCase().includes(q)
        );
      const matchesCategory =
        filters.category === "All Categories" || item.category === filters.category;
      const matchesStatus =
        filters.status === "All Statuses" || item.status === filters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [feedback, filters]);

  const summary = useMemo(() => {
    const total = feedback.length;
    const newFeedback = feedback.filter((i) => i.status === "In Review").length;
    const actionRequired = feedback.filter(
      (i) => i.status === "Action Required"
    ).length;
    const average = total
      ? (feedback.reduce((sum, i) => sum + i.rating, 0) / total).toFixed(1)
      : "0.0";
    return { total, newFeedback, actionRequired, average };
  }, [feedback]);

  const handleSelectFeedback = (id) => {
    setSelectedId(id);
  };

  const resetFilters = () =>
    setFilters({ search: "", category: "All Categories", status: "All Statuses" });

  const handleCloseModal = () => {
    if (modalState.sent) return;
    setModalState({ open: false, sent: false });
    setFeedbackRequest(INITIAL_REQUEST_FORM);
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    if (!feedbackRequest.mentor || !feedbackRequest.subject) return;

    setModalState({ open: true, sent: true });
    setTimeout(() => {
      setModalState({ open: false, sent: false });
      setFeedbackRequest(INITIAL_REQUEST_FORM);
    }, 1800);
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
        <FeedbackHeader
          totalFeedback={feedback.length}
          onRequestFeedback={() => setModalState({ open: true, sent: false })}
        />

        <FeedbackSummary
          feedback={feedback}
          summary={summary}
          onFilter={(type) => {
            if (type === "action")
              setFilters((f) => ({ ...f, status: "Action Required" }));
            else if (type === "new")
              setFilters((f) => ({ ...f, status: "In Review" }));
            else resetFilters();
          }}
        />

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            <input
              type="text"
              value={filters.search}
              onChange={(e) =>
                setFilters((f) => ({ ...f, search: e.target.value }))
              }
              placeholder="Search feedback by project, mentor, category or feedback ID..."
              className="h-10 w-full min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters((f) => ({ ...f, category: e.target.value }))
              }
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              {[
                "All Categories",
                "Code Quality",
                "System Design",
                "Testing",
                "UI / UX",
                "Security",
              ].map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value }))
              }
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              {["All Statuses", "Action Required", "In Review", "Resolved"].map(
                (st) => (
                  <option key={st}>{st}</option>
                )
              )}
            </select>
            <button
              type="button"
              onClick={resetFilters}
              className="h-10 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Reset
            </button>
          </div>
        </div>

        <FeedbackCategories />

        {/* Main Content - Only LatestFeedback is rendered (contains its own detail view) */}
        <div className="w-full">
          <LatestFeedback
            feedback={filteredFeedback}
            selectedId={selectedId}
            onSelect={handleSelectFeedback}
          />
        </div>
      </div>

      {/* Request Modal */}
      {modalState.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={handleCloseModal}
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm"
          />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {modalState.sent ? (
              <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  Feedback Request Sent
                </h3>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                  Your mentor has been notified about your feedback request.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                      <MessageSquarePlus className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Request Feedback
                      </h2>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Ask your mentor for feedback on your recent work.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSendRequest} className="space-y-5 p-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Select Mentor
                    </label>
                    <select
                      value={feedbackRequest.mentor}
                      onChange={(e) =>
                        setFeedbackRequest((r) => ({
                          ...r,
                          mentor: e.target.value,
                        }))
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="">Choose a mentor</option>
                      <option value="Rahul Patil">
                        Rahul Patil — Frontend Mentor
                      </option>
                      <option value="Ananya Sharma">
                        Ananya Sharma — Backend Mentor
                      </option>
                      <option value="Priya Sharma">
                        Priya Sharma — UI/UX Mentor
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Feedback on
                    </label>
                    <Input
                      value={feedbackRequest.subject}
                      onChange={(e) =>
                        setFeedbackRequest((r) => ({
                          ...r,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="e.g. Dashboard UI implementation"
                      className="h-11 rounded-xl border-slate-200 text-sm focus:border-indigo-400 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Message{" "}
                      <span className="ml-1 font-normal text-slate-400">
                        Optional
                      </span>
                    </label>
                    <Textarea
                      value={feedbackRequest.message}
                      onChange={(e) =>
                        setFeedbackRequest((r) => ({
                          ...r,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell your mentor what you'd like feedback on..."
                      className="min-h-[110px] resize-none rounded-xl border-slate-200 text-sm focus:border-indigo-400 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="flex justify-end gap-2 border-t border-slate-100 pt-5">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCloseModal}
                      className="h-10 rounded-xl px-4 text-xs font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={
                        !feedbackRequest.mentor || !feedbackRequest.subject
                      }
                      className="h-10 gap-2 rounded-xl bg-indigo-600 px-5 text-xs font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" /> Send Request
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}