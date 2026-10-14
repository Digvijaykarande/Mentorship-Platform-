"use client";

import {
  ArrowUpRight,
  Code2,
  FileText,
  FileUp,
  Image,
  Sparkles,
  TestTube2,
} from "lucide-react";

const WORK_TYPES = [
  {
    title: "Design artifacts",
    submitType: "Design Artifacts",
    description: "Figma files, wireframes, prototypes, and UI specifications.",
    formats: "Figma · PDF",
    icon: Image,
    accent: "indigo",
  },
  {
    title: "Code & projects",
    submitType: "Source Code",
    description:
      "Repositories, pull requests, source code, and implementation builds.",
    formats: "GitHub · ZIP",
    icon: Code2,
    accent: "emerald",
  },
  {
    title: "Documentation",
    submitType: "Documentation",
    description:
      "Reports, API docs, technical specifications, and presentations.",
    formats: "PDF · DOCX",
    icon: FileText,
    accent: "violet",
  },
  {
    title: "Testing & QA",
    submitType: "QA & Testing",
    description:
      "Test reports, screenshots, test cases, and verification results.",
    formats: "PDF · JSON",
    icon: TestTube2,
    accent: "orange",
  },
];

const accentStyles = {
  indigo: {
    icon: "bg-indigo-50 text-indigo-600 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/25",
    button: "bg-indigo-600 hover:bg-indigo-700",
    glow: "group-hover:border-indigo-200 dark:group-hover:border-indigo-500/25",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/25",
    button: "bg-emerald-600 hover:bg-emerald-700",
    glow: "group-hover:border-emerald-200 dark:group-hover:border-emerald-500/25",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 ring-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:ring-violet-500/25",
    button: "bg-violet-600 hover:bg-violet-700",
    glow: "group-hover:border-violet-200 dark:group-hover:border-violet-500/25",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600 ring-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/25",
    button: "bg-orange-600 hover:bg-orange-700",
    glow: "group-hover:border-orange-200 dark:group-hover:border-orange-500/25",
  },
};

export default function SubmittableWork({ onSubmit = () => {} }) {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/25">
            <FileUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-semibold tracking-tight text-slate-950 dark:text-white">
                Choose what you’re submitting
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Sparkles className="h-2.5 w-2.5" /> Mentor review
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Start with a work type and add your links, files, and notes.
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-400">4 work types</span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {WORK_TYPES.map((item) => {
          const Icon = item.icon;
          const styles = accentStyles[item.accent];
          return (
            <div
              key={item.title}
              className={`group flex min-h-[216px] flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg ${styles.glow} dark:border-slate-800 dark:bg-slate-800/50 dark:hover:bg-slate-900`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform group-hover:scale-105 ${styles.icon}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {item.formats}
                </span>
              </div>
              <h3 className="mt-5 text-sm font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
              <button
                type="button"
                onClick={() => onSubmit(item.submitType)}
                className={`mt-4 inline-flex h-9 items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-semibold text-white transition active:scale-[0.98] ${styles.button}`}
              >
                Start submission
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
