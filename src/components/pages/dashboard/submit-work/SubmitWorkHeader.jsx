"use client";

import { ArrowUpRight, FilePlus2, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SubmitWorkHeader({
  totalSubmissions = 0,
  onNewSubmission,
}) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#101426] px-6 py-7 text-white shadow-[0_18px_55px_-24px_rgba(15,23,42,0.55)] sm:px-8 sm:py-9 lg:px-10">
      <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[22%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Badge className="mb-4 gap-1.5 border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-indigo-100 hover:bg-white/10">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Keep your progress moving
          </Badge>
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-cyan-200">
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Submit work. Get better.
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                Share completed work with your mentor, turn feedback into
                action, and build a clear record of your internship progress.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={onNewSubmission}
            className="h-11 gap-2 rounded-xl bg-white px-4 text-slate-950 hover:bg-slate-100"
          >
            <FilePlus2 className="h-4 w-4" />
            New submission
            <ArrowUpRight className="ml-1 h-4 w-4 text-slate-500" />
          </Button>
        </div>
      </div>
    </section>
  );
}
