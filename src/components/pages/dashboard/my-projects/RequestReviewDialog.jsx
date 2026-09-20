"use client";

import { MessageSquareText, Send, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RequestReviewDialog({ open, onOpenChange, mentorName, note, onNoteChange, onSubmit, success }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 animate-bounce text-emerald-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Request Submitted!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your supervisor has been notified to review your current progress.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-sm font-bold">
                <MessageSquareText className="h-4.5 w-4.5 text-indigo-600" />
                Request Code & Deliverable Review
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Submit a note for <strong className="text-slate-700 dark:text-slate-300">{mentorName}</strong> detailing what you need reviewed.
              </p>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold">Note / Submission Details</Label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Describe what you completed, links to your PR, or specific questions..."
                  value={note}
                  onChange={(e) => onNoteChange(e.target.value)}
                  className="text-xs"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Send className="h-3.5 w-3.5" />
                  Send Request
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
