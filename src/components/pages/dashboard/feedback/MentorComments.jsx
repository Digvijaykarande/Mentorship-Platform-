"use client";

import {
  MessageCircle,
  Paperclip,
  Send,
  UserRound,
  Clock,
  CheckCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

export default function MentorComments({ feedback }) {
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!feedback) {
    return null;
  }

  const handleReply = () => {
    if (!reply.trim() || isSending) return;

    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      setReply("");
      setIsSending(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReply();
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-md">
      {/* Header with glassmorphism accent */}
      <div className="relative border-b border-slate-100/80 bg-gradient-to-r from-indigo-50/60 via-purple-50/30 to-white px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/20">
              <MessageCircle className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-extrabold tracking-tight text-slate-900 sm:text-base">
                Mentor Comments
              </h3>

              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
                <span>Thread History</span>
                <span className="inline-block h-1 w-1 rounded-full bg-slate-300" />
                <span className="font-semibold text-indigo-600">2 replies</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Active
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        {/* Mentor's Comment */}
        <div className="relative rounded-2xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 p-4 shadow-2xs sm:p-5 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm ring-1 ring-emerald-500/20">
                  <UserRound className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-900 sm:text-sm">
                  {feedback.mentor}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-500 sm:text-[11px]">
                  <span>{feedback.role || "Senior Mentor"}</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600">
                    <Clock className="h-3 w-3" />
                    2 hours ago
                  </span>
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200/80 bg-emerald-100/60 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
              <Sparkles className="h-3 w-3" />
              Mentor
            </span>
          </div>

          <div className="mt-3.5 pl-1 rounded-xl bg-white/80 p-3.5 border border-emerald-100/80 text-xs leading-relaxed text-slate-700 shadow-2xs">
            “{feedback.summary}”
          </div>
        </div>

        {/* User's Reply */}
        <div className="relative rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/40 via-white to-indigo-50/20 p-4 shadow-2xs sm:p-5 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-sm ring-1 ring-indigo-500/20">
                  <UserRound className="h-5 w-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 block h-3 w-3 rounded-full border-2 border-white bg-indigo-500" />
              </div>

              <div>
                <p className="text-xs font-extrabold text-slate-900 sm:text-sm">
                  You
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-500 sm:text-[11px]">
                  <span>Intern</span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 font-semibold text-indigo-600">
                    <Clock className="h-3 w-3" />
                    1 hour ago
                  </span>
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 rounded-md border border-indigo-200/80 bg-indigo-100/60 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-800">
              <CheckCheck className="h-3 w-3" />
              Read
            </span>
          </div>

          <div className="mt-3.5 pl-1 rounded-xl bg-white/80 p-3.5 border border-indigo-100/80 text-xs leading-relaxed text-slate-700 shadow-2xs">
            Thanks for the feedback. I’ll work through the suggested improvements and update the task.
          </div>
        </div>

        {/* Reply Input Box */}
        <div className="pt-3 border-t border-slate-100/80">
          <div className="relative rounded-2xl border border-slate-200/80 bg-slate-50/60 transition-all focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100/60 hover:border-slate-300">
            <div className="absolute left-3.5 top-3.5 text-slate-400">
              <MessageCircle className="h-4 w-4" />
            </div>

            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              maxLength={500}
              placeholder="Write your response..."
              className="w-full resize-none bg-transparent p-3.5 pl-10 pr-24 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-sm"
            />

            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-all hover:bg-slate-200/60 hover:text-indigo-600 active:scale-95"
                title="Attach file"
              >
                <Paperclip className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleReply}
                disabled={!reply.trim() || isSending}
                className={`flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-bold transition-all shadow-2xs ${
                  reply.trim() && !isSending
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-95"
                    : "bg-slate-200/80 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Send</span>
                <Send className={`h-3.5 w-3.5 ${isSending ? "animate-pulse" : ""}`} />
              </button>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
              <span className="flex items-center gap-1">
                Press <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[9px] font-bold text-slate-600 ring-1 ring-slate-200">⌘</kbd> + <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[9px] font-bold text-slate-600 ring-1 ring-slate-200">Enter</kbd> to reply
              </span>
            </div>

            <span className="font-mono text-[10px] font-semibold text-slate-400">
              {reply.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100/80 bg-slate-50/50 px-5 py-3 sm:px-6">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          Keep feedback constructive & actionable
        </span>

        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
          Encrypted
        </span>
      </div>
    </section>
  );
}