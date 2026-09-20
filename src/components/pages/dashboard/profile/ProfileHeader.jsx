"use client";

import { MapPin, Calendar, Briefcase, Camera, CheckCircle2, Sparkles, FolderGit2, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/common/StatCard";
import InfoChip from "@/components/common/InfoChip";

export default function ProfileHeader({ formData, avatarUrl, avatarInputRef, handleAvatarUpload }) {
  const initials = `${formData?.firstName?.charAt(0) || ""}${formData?.lastName?.charAt(0) || ""}`;

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-1 shadow-2xl">
      <input type="file" ref={avatarInputRef} onChange={handleAvatarUpload} accept="image/*" className="hidden" />

      {/* Glow Effects */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <CardContent className="relative rounded-[22px] bg-slate-900/60 p-6 backdrop-blur-xl sm:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Identity */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="group relative h-28 w-28 shrink-0">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800 text-3xl font-extrabold text-white shadow-inner transition-transform duration-300 group-hover:scale-[1.02]">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="bg-gradient-to-br from-indigo-200 to-slate-400 bg-clip-text text-transparent">
                    {initials}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-slate-950/80 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  <Camera className="h-5 w-5 text-indigo-400" />
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">Upload</span>
                </button>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-2 ring-emerald-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {formData.firstName} {formData.lastName}
                </h2>
                <Badge className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10">
                  <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                  {formData.internshipStatus}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
                <span className="text-slate-300">@{formData.username}</span>
                <span className="text-slate-700">•</span>
                <span>
                  ID: <span className="font-mono text-indigo-300">{formData.internId}</span>
                </span>
                <span className="text-slate-700">•</span>
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  {formData.headline}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <InfoChip icon={Briefcase} iconClassName="text-indigo-400">{formData.company}</InfoChip>
                <InfoChip icon={MapPin} iconClassName="text-rose-400">{formData.location}</InfoChip>
                <InfoChip icon={Calendar} iconClassName="text-amber-400">Joined {formData.joinDate}</InfoChip>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 border-t border-slate-800/80 pt-6 lg:border-t-0 lg:pt-0">
            <StatCard icon={TrendingUp} iconClassName="text-emerald-400" label="Progress" value="92%" />
            <StatCard icon={FolderGit2} iconClassName="text-indigo-400" label="Projects" value="12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
