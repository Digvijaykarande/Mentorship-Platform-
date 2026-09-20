"use client";

import { CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TIME_SLOTS = ["10:00 AM - 10:30 AM", "02:00 PM - 02:30 PM", "04:30 PM - 05:00 PM"];

export default function ScheduleMeetingDialog({ open, onOpenChange, mentorName, form, onFormChange, onSubmit, success }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {success ? (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 animate-bounce text-emerald-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Meeting Scheduled!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Confirmation sent to {mentorName}. Check your calendar.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-sm font-bold">
                <CalendarDays className="h-4.5 w-4.5 text-indigo-600" />
                Schedule Internship 1-on-1
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Book a check-in with <strong className="text-slate-700 dark:text-slate-300">{mentorName}</strong> for project guidance or milestone review.
              </p>

              <div className="flex gap-3">
                <div className="flex-1 space-y-1.5">
                  <Label className="text-[11px] font-semibold">Date</Label>
                  <Input type="date" required value={form.date} onChange={(e) => onFormChange("date", e.target.value)} className="text-xs" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <Label className="text-[11px] font-semibold">Time Slot</Label>
                  <Select value={form.time} onValueChange={(val) => onFormChange("time", val)}>
                    <SelectTrigger className="w-full text-xs">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[11px] font-semibold">Discussion Topic</Label>
                <Input
                  placeholder="e.g. Phase 3 Architecture or Evaluation Feedback"
                  value={form.topic}
                  onChange={(e) => onFormChange("topic", e.target.value)}
                  className="text-xs"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit" size="sm" className="gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
                  <Clock className="h-3.5 w-3.5" />
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
