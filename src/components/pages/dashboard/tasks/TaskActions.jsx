"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  MoreHorizontal,
  Repeat,
  RotateCcw,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskActions({
  onApprove,
  onRequestRevision,
  onScheduleReview,
  onShare,
  onReassign,
}) {
  const [loadingAction, setLoadingAction] = useState(null);
  const run = async (key, callback) => {
    if (loadingAction) return;
    setLoadingAction(key);
    try {
      await callback?.();
    } finally {
      setLoadingAction(null);
    }
  };
  return (
    <div className="flex items-center gap-2 rounded-[16px] border border-slate-200/80 bg-white p-2 shadow-sm">
      <Button
        type="button"
        disabled={Boolean(loadingAction)}
        onClick={() => run("approve", onApprove)}
        className="h-10 flex-1 gap-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
      >
        {loadingAction === "approve" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}{" "}
        Approve
      </Button>
      <Button
        type="button"
        variant="outline"
        disabled={Boolean(loadingAction)}
        onClick={() => run("revision", onRequestRevision)}
        className="h-10 flex-1 gap-1.5 rounded-xl border-amber-200 text-amber-700 hover:bg-amber-50"
      >
        {loadingAction === "revision" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RotateCcw className="h-4 w-4" />
        )}{" "}
        Revise
      </Button>
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled={Boolean(loadingAction)}
        onClick={() => run("schedule", onScheduleReview)}
        aria-label="Schedule review"
        className="h-10 w-10 rounded-xl"
      >
        {loadingAction === "schedule" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Calendar className="h-4 w-4" />
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="More actions"
              className="h-10 w-10 rounded-xl"
            />
          }
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => run("share", onShare)}>
            <Share2 className="h-3.5 w-3.5" /> Share link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => run("reassign", onReassign)}>
            <Repeat className="h-3.5 w-3.5" /> Reassign
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}