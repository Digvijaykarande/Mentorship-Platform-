"use client";

import { MessageSquarePlus, Send, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MENTORS } from "./feedbackData";

export default function RequestFeedbackDialog({ open, onOpenChange, form, onFormChange, onSubmit, sent }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {sent ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
            <CheckCircle2 className="h-12 w-12 animate-bounce text-emerald-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Feedback Request Sent</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Your mentor has been notified.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-sm font-bold">
                <MessageSquarePlus className="h-4.5 w-4.5 text-indigo-600" />
                Request Feedback
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">Ask your mentor for feedback on your recent work.</p>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold">Select Mentor</Label>
                <Select value={form.mentor} onValueChange={(val) => onFormChange("mentor", val)}>
                  <SelectTrigger className="w-full text-xs">
                    <SelectValue placeholder="Choose a mentor" />
                  </SelectTrigger>
                  <SelectContent>
                    {MENTORS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold">Feedback on</Label>
                <Input
                  required
                  placeholder="e.g. Dashboard UI implementation"
                  value={form.subject}
                  onChange={(e) => onFormChange("subject", e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold">
                  Message <span className="font-normal text-slate-400">Optional</span>
                </Label>
                <Textarea
                  rows={3}
                  placeholder="Tell your mentor what you'd like feedback on..."
                  value={form.message}
                  onChange={(e) => onFormChange("message", e.target.value)}
                  className="text-xs"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" size="sm" disabled={!form.mentor || !form.subject} className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
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
