"use client";

import { GraduationCap, Award, Briefcase } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";

const EDUCATION = [
  { degree: "MCA", school: "Bharati Vidyapeeth (IMED)", meta: "CGPA 9.0", period: "2024 — 2026" },
  { degree: "BCA", school: "Shivaji University", meta: "CGPA 8.99", period: "2021 — 2024" },
];

const CERTIFICATIONS = [
  { name: "Full Stack Java Development", issuer: "Symbiosis Skills & Professional University / Capgemini", year: "2024" },
  { name: "AI & Employability Skills", issuer: "Magic Bus / Infosys Foundation", year: "2024" },
];

const EXPERIENCE = [
  { role: "Full-Stack Developer Trainee", org: "LoyaNox", period: "Aug 2026 — Present", current: true },
];

function TimelineList({ items, render }) {
  return (
    <ol className="space-y-0">
      {items.map((item, i) => (
        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-slate-900 dark:bg-white" />
            {i < items.length - 1 && <span className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-800" />}
          </div>
          <div className="min-w-0 flex-1 -mt-0.5">{render(item)}</div>
        </li>
      ))}
    </ol>
  );
}

export default function ProfileDetails({ formData }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <SectionCard
        icon={GraduationCap}
        title="Education"
        description="Academic background"
        iconClassName="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        contentClassName="p-5"
      >
        <TimelineList
          items={EDUCATION}
          render={(item) => (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.degree}</p>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{item.period}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.school}</p>
              <Badge variant="outline" className="mt-1.5 text-[11px] font-medium">{item.meta}</Badge>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard
        icon={Briefcase}
        title="Experience"
        description="Roles & internships"
        iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
        contentClassName="p-5"
      >
        <TimelineList
          items={EXPERIENCE}
          render={(item) => (
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.role}</p>
                {item.current && (
                  <Badge className="rounded-full bg-emerald-50 px-2 py-0 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.org}</p>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{item.period}</span>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard
        icon={Award}
        title="Certifications"
        description="Verified credentials"
        iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400"
        className="lg:col-span-2"
        contentClassName="grid gap-3 p-5 sm:grid-cols-2"
      >
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={i}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
              <Award className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-white">{cert.name}</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{cert.issuer}</p>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{cert.year}</span>
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}