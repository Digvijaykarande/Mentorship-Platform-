"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AuthField,
  OrDivider,
  PasswordField,
  SocialButtons,
  primaryButton,
} from "./AuthField";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ redirectTo = "/dashboard/my-projects" }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    if (formError) setFormError("");
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(form.email.trim()))
      next.email = "That email doesn't look right.";
    if (!form.password) next.password = "Enter your password.";
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
      // const res = await fetch("/api/auth/login", { method: "POST", ... });
      await new Promise((r) => setTimeout(r, 900));
      router.push(redirectTo);
    } catch {
      setFormError("We couldn't sign you in. Check your details and try again.");
      setLoading(false);
    }
  };

  const handleSocial = (provider) => {
    // TODO: start your OAuth flow for `provider`
    console.log("social login:", provider);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-2xl dark:text-white">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 [@media(max-height:640px)]:hidden">
          Sign in to pick up where you left off.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)] sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <SocialButtons onSelect={handleSocial} />
        <div className="my-3.5">
          <OrDivider />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {formError && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {formError}
            </div>
          )}

          <AuthField
            id="login-email"
            label="Email"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={update("email")}
            error={errors.email}
          />

          <PasswordField
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={update("password")}
            error={errors.password}
            action={
              <Link
                href="/forgot-password"
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Forgot password?
              </Link>
            }
          />


          <div className="flex items-center gap-2.5">
            <Checkbox
              id="login-remember"
              checked={form.remember}
              onCheckedChange={(checked) =>
                setForm((f) => ({ ...f, remember: Boolean(checked) }))
              }
            />
            <Label
              htmlFor="login-remember"
              className="cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400"
            >
              Keep me signed in on this device
            </Label>
          </div>

          <Button type="submit" disabled={loading} className={primaryButton}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                Sign in <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        New to Loyanox?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
