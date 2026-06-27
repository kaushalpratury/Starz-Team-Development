"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { GuestOnly } from "@/components/auth/auth-guards";
import { useAuth } from "@/components/auth/auth-provider";
import { AuthShell } from "@/components/auth/auth-shell";
import { FormField } from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { getFriendlyAuthError } from "@/lib/auth-errors";
import {
  validateRegistration,
  validateRegistrationField,
  type RegistrationErrors,
  type RegistrationField,
  type RegistrationFields,
} from "@/lib/auth-validation";
import { registerParentAccount } from "@/lib/firebase/auth";

const initialValues: RegistrationFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: RegistrationField, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateRegistrationField(field, nextValues),
        ...(field === "password" && current.confirmPassword
          ? { confirmPassword: validateRegistrationField("confirmPassword", nextValues) }
          : {}),
      }));
    }
  }

  function validateField(field: RegistrationField) {
    setErrors((current) => ({
      ...current,
      [field]: validateRegistrationField(field, values),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await registerParentAccount(values);
      await refreshProfile();
      router.replace("/parent");
    } catch (error) {
      setFormError(getFriendlyAuthError(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <GuestOnly>
      <AuthShell
        eyebrow="Parent Registration"
        title="Create your account"
        description="Set up your parent account for Stillwater Starz private lessons."
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-navy-700 underline-offset-4 hover:underline">
              Sign In
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {formError ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
            >
              {formError}
            </div>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="firstName"
              label="First Name"
              autoComplete="given-name"
              value={values.firstName}
              error={errors.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              onBlur={() => validateField("firstName")}
            />
            <FormField
              id="lastName"
              label="Last Name"
              autoComplete="family-name"
              value={values.lastName}
              error={errors.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              onBlur={() => validateField("lastName")}
            />
          </div>

          <FormField
            id="registerEmail"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            error={errors.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => validateField("email")}
          />
          <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={values.phone}
            error={errors.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={() => validateField("phone")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="registerPassword"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={values.password}
              error={errors.password}
              onChange={(event) => updateField("password", event.target.value)}
              onBlur={() => validateField("password")}
            />
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => updateField("confirmPassword", event.target.value)}
              onBlur={() => validateField("confirmPassword")}
            />
          </div>
          <p className="-mt-2 text-xs leading-5 text-slate-500">
            Use at least 8 characters for your password.
          </p>

          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? "Creating Account…" : "Create Parent Account"}
          </Button>
        </form>
      </AuthShell>
    </GuestOnly>
  );
}
