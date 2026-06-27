"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { GuestOnly } from "@/components/auth/auth-guards";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { getFriendlyAuthError } from "@/lib/auth-errors";
import { validateEmail } from "@/lib/auth-validation";
import { sendParentPasswordReset, signInParent } from "@/lib/firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      password: password ? undefined : "Password is required.",
    };
    setErrors(nextErrors);
    setMessage(null);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    try {
      await signInParent(email, password, rememberMe);
      router.replace("/parent");
    } catch (error) {
      setMessage({ type: "error", text: getFriendlyAuthError(error) });
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePasswordReset() {
    const emailError = validateEmail(email);
    setErrors((current) => ({ ...current, email: emailError }));
    setMessage(null);
    if (emailError) return;

    setResetting(true);
    try {
      await sendParentPasswordReset(email);
      setMessage({
        type: "success",
        text: "Password reset instructions have been sent if an account exists for that email.",
      });
    } catch (error) {
      setMessage({ type: "error", text: getFriendlyAuthError(error) });
    } finally {
      setResetting(false);
    }
  }

  return (
    <GuestOnly>
      <AuthShell
        eyebrow="Parent Portal"
        title="Welcome back"
        description="Sign in to your Stillwater Starz parent account."
        footer={
          <>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-navy-700 underline-offset-4 hover:underline">
              Create Parent Account
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {message ? (
            <div
              role={message.type === "error" ? "alert" : "status"}
              className={
                message.type === "error"
                  ? "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                  : "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800"
              }
            >
              {message.text}
            </div>
          ) : null}

          <FormField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-navy-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500"
              />
              Remember Me
            </label>
            <button
              type="button"
              onClick={handlePasswordReset}
              disabled={submitting || resetting}
              className="text-sm font-semibold text-navy-700 underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {resetting ? "Sending…" : "Forgot Password?"}
            </button>
          </div>

          <Button type="submit" disabled={submitting || resetting} className="w-full">
            {submitting ? "Signing In…" : "Sign In"}
          </Button>
        </form>
      </AuthShell>
    </GuestOnly>
  );
}
