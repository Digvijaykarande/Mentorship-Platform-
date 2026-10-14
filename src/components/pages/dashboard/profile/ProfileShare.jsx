"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Globe, Link2, Mail, QrCode, Share2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formatUrl = (url = "") => (/^https?:\/\//i.test(url) ? url : `https://${url}`);

const LINKED_PROFILES = [
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, iconClassName: "text-sky-600 dark:text-sky-400" },
  { key: "github", label: "GitHub", icon: FaGithub, iconClassName: "text-slate-800 dark:text-slate-200" },
  { key: "portfolio", label: "Portfolio", icon: Globe, iconClassName: "text-violet-600 dark:text-violet-400" },
];

function ShareButton({ icon: Icon, label, href, onClick, iconClassName }) {
  const className =
    "flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700/70 dark:bg-slate-800/60 dark:text-slate-200 dark:shadow-none dark:hover:border-indigo-400/50 dark:hover:bg-slate-800";
  const content = (
    <>
      <Icon className={`h-4 w-4 ${iconClassName}`} aria-hidden="true" />
      {label}
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export default function ProfileShare({ formData }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  const profileUrl = `https://loyanox.com/u/${formData?.username || "profile"}`;
  const fullName = `${formData?.firstName || ""} ${formData?.lastName || ""}`.trim();
  const shareText = `Check out ${fullName ? `${fullName}'s` : "my"} profile on LoyaNox`;

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=12&data=${encodeURIComponent(profileUrl)}`,
    [profileUrl],
  );

  // Detected after mount so server and client markup match.
  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = profileUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: fullName || "My profile", text: shareText, url: profileUrl });
    } catch {
      /* share sheet dismissed */
    }
  };

  const handleDownloadQr = async () => {
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "loyanox-profile-qr.png";
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(qrUrl, "_blank", "noopener,noreferrer");
    }
  };

  const encodedUrl = encodeURIComponent(profileUrl);
  const encodedText = encodeURIComponent(shareText);
  const linkedProfiles = LINKED_PROFILES.filter((p) => formData?.[p.key]);

  return (
    <Card className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-1 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-2xl dark:shadow-none">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/15" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-violet-400/15 blur-3xl dark:bg-violet-500/15" />

      <CardContent className="relative rounded-[18px] bg-slate-50/80 p-5 backdrop-blur-xl dark:bg-slate-900/60 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-center">
          {/* Link and actions */}
          <div className="min-w-0 space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25">
                <Share2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Share your profile</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">One link for mentors, recruiters and your network.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 pl-3.5 shadow-xs dark:border-slate-700/70 dark:bg-slate-950/70 dark:shadow-none">
              <Link2 className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate font-mono text-xs text-slate-700 dark:text-slate-300" title={profileUrl}>
                {profileUrl}
              </span>
              <Button
                type="button"
                onClick={handleCopy}
                className={`h-9 shrink-0 gap-2 rounded-xl px-4 text-xs font-semibold text-white transition-colors ${
                  copied ? "bg-emerald-600 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? "Copied" : "Copy link"}
              </Button>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">Send it through</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {canNativeShare && (
                  <ShareButton
                    icon={Share2}
                    label="Share"
                    onClick={handleNativeShare}
                    iconClassName="text-indigo-600 dark:text-indigo-400"
                  />
                )}
                <ShareButton
                  icon={FaWhatsapp}
                  label="WhatsApp"
                  href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
                  iconClassName="text-emerald-600 dark:text-emerald-400"
                />
                <ShareButton
                  icon={FaLinkedin}
                  label="LinkedIn"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  iconClassName="text-sky-600 dark:text-sky-400"
                />
                <ShareButton
                  icon={Mail}
                  label="Email"
                  href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
                  iconClassName="text-amber-600 dark:text-amber-400"
                />
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">Linked profiles</p>
              {linkedProfiles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {linkedProfiles.map(({ key, label, icon: Icon, iconClassName }) => (
                    <a
                      key={key}
                      href={formatUrl(formData[key])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-3 pr-2.5 text-xs font-medium text-slate-600 shadow-xs transition-colors hover:border-indigo-300 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700/70 dark:bg-slate-800/50 dark:text-slate-300 dark:shadow-none dark:hover:border-indigo-400/50 dark:hover:text-white"
                    >
                      <Icon className={`h-3.5 w-3.5 ${iconClassName}`} aria-hidden="true" />
                      {label}
                      <ArrowUpRight
                        className="h-3 w-3 text-slate-400 group-hover:text-indigo-600 dark:text-slate-500 dark:group-hover:text-indigo-300"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs italic text-slate-400 dark:text-slate-500">Add links in Overview to show them here.</p>
              )}
            </div>
          </div>

          {/* QR code */}
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 p-[2px] shadow-xl shadow-indigo-500/20">
              <div className="flex h-44 w-44 items-center justify-center rounded-[18px] bg-white p-3">
                <img src={qrUrl} alt="QR code for public profile" className="h-full w-full object-contain" />
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <QrCode className="h-3.5 w-3.5" aria-hidden="true" /> Scan to open profile
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadQr}
              className="w-full gap-2 border-slate-200 bg-white text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download QR
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}