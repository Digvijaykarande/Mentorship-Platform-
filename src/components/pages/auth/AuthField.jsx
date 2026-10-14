"use client";

import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuthField({
  id,
  label,
  icon: Icon,
  error,
  action,
  trailing,
  size = "md", // "md" = comfortable, "sm" = compact (used by the longer register form)
  className,
  ...props
}) {
  const compact = size === "sm";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={id}
          className="text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          {label}
        </Label>
        {action}
      </div>
      <div className="group relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400" />
        )}
        <Input
          id={id}
          aria-invalid={Boolean(error)}
          className={cn(
            "rounded-xl border-slate-200 bg-white shadow-sm transition-shadow placeholder:text-slate-400 focus-visible:border-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900",
            compact ? "h-9 text-[13px]" : "h-10 text-sm",
            Icon && "pl-9",
            trailing && "pr-10",
            error &&
              "border-rose-300 focus-visible:border-rose-400 focus-visible:ring-rose-500/10",
            className,
          )}
          {...props}
        />
        {trailing && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p
          role="alert"
          className="flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export function PasswordField({ icon = Lock, size = "md", ...props }) {
  const [show, setShow] = useState(false);
  return (
    <AuthField
      {...props}
      size={size}
      icon={icon}
      type={show ? "text" : "password"}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      }
    />
  );
}

export function SocialButtons({ onSelect = () => {}, compact = false }) {
  const base = cn(
    "gap-2 rounded-xl border-slate-200 bg-white font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    compact ? "h-9 text-[13px]" : "h-10 text-sm",
  );
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <Button
        type="button"
        variant="outline"
        className={base}
        onClick={() => onSelect("google")}
      >
        <FaGoogle className="h-3.5 w-3.5 text-[#ea4335]" /> Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className={base}
        onClick={() => onSelect("github")}
      >
        <FaGithub className="h-4 w-4" /> GitHub
      </Button>
    </div>
  );
}

export function OrDivider({ children = "or continue with email" }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      {children}
      <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

// Same indigo as the dashboard buttons.
export const primaryButton =
  "h-10 w-full gap-2 rounded-xl bg-indigo-600 font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70 dark:bg-indigo-500 dark:hover:bg-indigo-400";
