"use client";

import { useState } from "react";
import { UserCheck, MessageSquare, BadgeCheck, CalendarDays, MessageSquareText } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScheduleMeetingDialog from "./ScheduleMeetingDialog";
import RequestReviewDialog from "./RequestReviewDialog";
import { mentor } from "./projectsData";

const initials = mentor?.name
  ? mentor.name.split(" ").filter((w) => w[0] === w[0]?.toUpperCase() && w[0] !== "Dr.").map((w) => w[0]).join("").slice(0, 2)
  : "M";

export default function ProjectMentor() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({ date: "", time: "", topic: "" });
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleScheduleSubmit = () => {
    if (!scheduleForm.date || !scheduleForm.time) return;
    setScheduleSuccess(true);
    setTimeout(() => {
      setScheduleSuccess(false);
      setIsScheduleOpen(false);
      setScheduleForm({ date: "", time: "", topic: "" });
    }, 1800);
  };

  const handleReviewSubmit = () => {
    if (!reviewNote.trim()) return;
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setIsReviewOpen(false);
      setReviewNote("");
    }, 1800);
  };

  return (
    <>
      <SectionCard
        icon={UserCheck}
        title="Assigned Supervisor & Mentor"
        iconClassName="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
        action={
          mentor?.online && (
            <Badge className="gap-1.5 rounded-full bg-emerald-50 text-[10.5px] font-semibold text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available
            </Badge>
          )
        }
        contentClassName="space-y-5 p-5"
      >
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12 ring-2 ring-slate-100 dark:ring-slate-800">
              <AvatarFallback className="bg-gradient-to-br from-indigo-200 to-violet-200 font-bold text-indigo-700">{initials}</AvatarFallback>
            </Avatar>
            {mentor?.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="truncate text-xs font-bold text-slate-900 dark:text-white">{mentor?.name || "Dr. Sarah Jenkins"}</h4>
              {mentor?.verified && <BadgeCheck className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" title="Verified Supervisor" />}
            </div>
            <span className="truncate text-[10.5px] text-slate-500 dark:text-slate-400">{mentor?.title || "Lead Technical Mentor"}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-900/40">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <MessageSquare className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              {mentor?.feedback?.label || "Latest Feedback"}
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">{mentor?.feedback?.timeAgo || "2 days ago"}</span>
          </div>
          <p className="text-xs italic leading-relaxed text-slate-700 dark:text-slate-300">
            &ldquo;{mentor?.feedback?.quote || "Great progress on the recent deliverable!"}&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={() => setIsScheduleOpen(true)} className="min-w-[140px] flex-1 gap-1.5 bg-indigo-600 text-white hover:bg-indigo-700">
            <CalendarDays className="h-3.5 w-3.5" />
            Schedule 1-on-1
          </Button>
          <Button type="button" variant="secondary" onClick={() => setIsReviewOpen(true)} className="min-w-[140px] flex-1 gap-1.5">
            <MessageSquareText className="h-3.5 w-3.5" />
            Request Review
          </Button>
        </div>
      </SectionCard>

      <ScheduleMeetingDialog
        open={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        mentorName={mentor?.name || "your supervisor"}
        form={scheduleForm}
        onFormChange={(key, val) => setScheduleForm((prev) => ({ ...prev, [key]: val }))}
        onSubmit={handleScheduleSubmit}
        success={scheduleSuccess}
      />
      <RequestReviewDialog
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
        mentorName={mentor?.name || "your supervisor"}
        note={reviewNote}
        onNoteChange={setReviewNote}
        onSubmit={handleReviewSubmit}
        success={reviewSuccess}
      />
    </>
  );
}
