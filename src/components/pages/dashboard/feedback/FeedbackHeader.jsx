"use client";

import { MessageSquarePlus, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FeedbackHeader({ totalFeedback = 0, onRequestFeedback }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
          <MessageSquareText className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-xl">Feedback</h1>
          </div>
          <p className="mt-0.5 max-w-md text-xs text-slate-400 dark:text-slate-500">
            Review mentor feedback and track improvements across your internship.
          </p>
        </div>
      </div>

      <Button type="button" onClick={onRequestFeedback} className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
        <MessageSquarePlus className="h-4 w-4" />
        Request Feedback
      </Button>
    </div>
  );
}
