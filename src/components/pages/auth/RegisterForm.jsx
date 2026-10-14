"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Check,
  GraduationCap,
  Loader2,
  Mail,
  User,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthField,
  OrDivider,
  PasswordField,
  SocialButtons,
  primaryButton,
} from "./AuthField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLES = [
  {
    value: "intern",
    label: "Intern",
    hint: "Submit work, get feedback",
    icon: GraduationCap,
  },
  {
    value: "mentor",
    label: "Mentor",
    hint: "Guide and review interns",
    icon: UserCheck,
  },
];

const STRENGTH = [
  { label: "Too weak", bar: "bg-rose-500", text: "text-rose-600" },
  { label: "Weak", bar: "bg-rose-500", text: "text-rose-600" },
  { label: "Fair", bar: "bg-amber-500", text: "text-amber-600" },
  { label: "Good", bar: "bg-emerald-400", text: "text-emerald-600" },
  { label: "Strong", bar: "bg-emerald-500", text: "text-emerald-600" },
];

function checkPassword(pw) {
  const rules = [
    { label: "8+ characters", short: "8+ chars", ok: pw.length >= 8 },
    { label: "Upper & lower case", short: "Aa", ok: /[a-z]/.test(pw) && /[A-Z]/.test(pw) },
    { label: "A number", short: "Number", ok: /\d/.test(pw) },
    { label: "A symbol", short: "Symbol", ok: /[^A-Za-z0-9]/.test(pw) },
  ];
  const score = pw ? rules.filter((r) => r.ok).length : 0;
  return { rules, score };
}

export default function RegisterForm({ redirectTo = "/dashboard/my-projects" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "intern",
    password: "",
    confirm: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const { rules, score } = useMemo(
    () => checkPassword(form.password),
    [form.password],
  );

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (formError) setFormError("");
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Enter your full name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "That email doesn't look right.";
    if (form.password.length < 8)
      next.password = "Use at least 8 characters.";
    if (form.confirm !== form.password)
      next.confirm = "Passwords don't match.";
    if (!form.terms) next.terms = "Please accept the terms to continue.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setFormError("");
    try {
      // TODO: replace with your real API call, e.g.
      // await fetch("/api/auth/register", { method: "POST", body: JSON.stringify({ ...form }) });
      await new Promise((r) => setTimeout(r, 1000));
      router.push(redirectTo);
    } catch {
      setFormError("We couldn't create your account. Please try again.");
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    // TODO: start your OAuth flow for `provider`
    console.log("social signup:", provider);
  };

  const strength = STRENGTH[score];

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 [@media(max-height:680px)]:hidden">
          Join Loyanox and start tracking your internship journey.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-900">
        <SocialButtons onSelect={handleSocial} compact />
        <div className="my-3">
          <OrDivider>or sign up with email</OrDivider>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
          {formError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {formError}
            </div>
          )}

          {/* Role */}
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              I am joining as
            </p>
            <div role="radiogroup" className="grid grid-cols-2 gap-2">
              {ROLES.map(({ value, label, hint, icon: Icon }) => {
                const active = form.role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setForm((f) => ({ ...f, role: value }))}
                    className={cn(
                      "relative flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-left transition-all",
                      active
                        ? "border-indigo-300 bg-indigo-50/70 ring-4 ring-indigo-500/10 dark:border-indigo-500/40 dark:bg-indigo-500/10"
                        : "border-slate-200 hover:border-indigo-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                        active
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-slate-900 dark:text-white">
                        {label}
                      </span>
                      <span className="block truncate text-[10.5px] text-slate-500 dark:text-slate-400">
                        {hint}
                      </span>
                    </span>
                    {active && (
                      <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <AuthField
              id="register-name"
              label="Full name"
              icon={User}
              size="sm"
              autoComplete="name"
              placeholder="Your full name"
              value={form.name}
              onChange={update("name")}
              error={errors.name}
            />
            <AuthField
              id="register-email"
              label="Email"
              icon={Mail}
              size="sm"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={update("email")}
              error={errors.email}
            />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <PasswordField
              id="register-password"
              label="Password"
              size="sm"
              autoComplete="new-password"
              placeholder="Create a password"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
            />
            <PasswordField
              id="register-confirm"
              label="Confirm password"
              size="sm"
              autoComplete="new-password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={update("confirm")}
              error={errors.confirm}
            />
          </div>

          {/* Strength: always visible so the layout never jumps */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="grid w-24 shrink-0 grid-cols-4 gap-1">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 rounded-full transition-colors duration-300",
                    i <= score ? strength.bar : "bg-slate-200 dark:bg-slate-800",
                  )}
                />
              ))}
            </div>
            <span
              className={cn(
                "shrink-0 text-[11px] font-semibold",
                form.password ? strength.text : "text-slate-400",
              )}
            >
              {form.password ? strength.label : "Strength"}
            </span>
            <ul className="ml-auto flex flex-wrap justify-end gap-x-2.5 gap-y-0.5">
              {rules.map((r) => (
                <li
                  key={r.label}
                  title={r.label}
                  className={cn(
                    "flex items-center gap-1 text-[11px] transition-colors",
                    r.ok
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400",
                  )}
                >
                  <Check
                    className={cn(
                      "h-3 w-3 transition-opacity",
                      r.ok ? "opacity-100" : "opacity-30",
                    )}
                  />
                  {r.short}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="register-terms"
                checked={form.terms}
                onCheckedChange={(checked) =>
                  setForm((f) => ({ ...f, terms: Boolean(checked) }))
                }
                className="mt-0.5"
              />
              <Label
                htmlFor="register-terms"
                className="cursor-pointer select-none text-[11.5px] leading-5 text-slate-600 dark:text-slate-400"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
            {errors.terms && (
              <p
                role="alert"
                className="flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400"
              >
                <AlertCircle className="h-3 w-3 shrink-0" />
                {errors.terms}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className={primaryButton}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Creating account...
              </>
            ) : (
              <>
                Create account <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
