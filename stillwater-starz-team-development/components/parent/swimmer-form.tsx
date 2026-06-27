"use client";

import { useState, type FormEvent } from "react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getFriendlySwimmerError } from "@/lib/swimmer-errors";
import {
  abilityLevels,
  validateSwimmer,
  validateSwimmerField,
  type SwimmerErrors,
  type SwimmerField,
  type SwimmerFields,
} from "@/lib/swimmer-validation";
import { cn } from "@/lib/utils";

interface SwimmerFormProps {
  initialValues: SwimmerFields;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (values: SwimmerFields) => Promise<void>;
}

function localToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export function SwimmerForm({
  initialValues,
  submitLabel,
  submittingLabel,
  onSubmit,
}: SwimmerFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<SwimmerErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: SwimmerField, value: string) {
    const nextValues = { ...values, [field]: value } as SwimmerFields;
    setValues(nextValues);
    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateSwimmerField(field, nextValues),
      }));
    }
  }

  function validateField(field: SwimmerField) {
    setErrors((current) => ({
      ...current,
      [field]: validateSwimmerField(field, values),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateSwimmer(values);
    setErrors(nextErrors);
    setFormError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      setFormError(getFriendlySwimmerError(error));
      setSubmitting(false);
    }
  }

  const fieldClass = (error?: string) =>
    cn(error && "border-red-500 focus:border-red-500 focus:ring-red-100");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {formError ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
          {formError}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-navy-800">
            First Name
          </label>
          <Input
            id="firstName"
            autoComplete="given-name"
            value={values.firstName}
            disabled={submitting}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={fieldClass(errors.firstName)}
            onChange={(event) => updateField("firstName", event.target.value)}
            onBlur={() => validateField("firstName")}
          />
          {errors.firstName ? <p id="firstName-error" role="alert" className="mt-1.5 text-sm text-red-600">{errors.firstName}</p> : null}
        </div>

        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-navy-800">
            Last Name
          </label>
          <Input
            id="lastName"
            autoComplete="family-name"
            value={values.lastName}
            disabled={submitting}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={fieldClass(errors.lastName)}
            onChange={(event) => updateField("lastName", event.target.value)}
            onBlur={() => validateField("lastName")}
          />
          {errors.lastName ? <p id="lastName-error" role="alert" className="mt-1.5 text-sm text-red-600">{errors.lastName}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dateOfBirth" className="mb-2 block text-sm font-semibold text-navy-800">
            Date of Birth
          </label>
          <Input
            id="dateOfBirth"
            type="date"
            max={localToday()}
            value={values.dateOfBirth}
            disabled={submitting}
            aria-invalid={Boolean(errors.dateOfBirth)}
            aria-describedby={errors.dateOfBirth ? "dateOfBirth-error" : undefined}
            className={fieldClass(errors.dateOfBirth)}
            onChange={(event) => updateField("dateOfBirth", event.target.value)}
            onBlur={() => validateField("dateOfBirth")}
          />
          {errors.dateOfBirth ? <p id="dateOfBirth-error" role="alert" className="mt-1.5 text-sm text-red-600">{errors.dateOfBirth}</p> : null}
        </div>

        <div>
          <label htmlFor="abilityLevel" className="mb-2 block text-sm font-semibold text-navy-800">
            Ability Level
          </label>
          <Select
            id="abilityLevel"
            value={values.abilityLevel}
            disabled={submitting}
            aria-invalid={Boolean(errors.abilityLevel)}
            aria-describedby={errors.abilityLevel ? "abilityLevel-error" : undefined}
            className={fieldClass(errors.abilityLevel)}
            onChange={(event) => updateField("abilityLevel", event.target.value)}
            onBlur={() => validateField("abilityLevel")}
          >
            <option value="">Select a level</option>
            {abilityLevels.map((level) => <option key={level} value={level}>{level}</option>)}
          </Select>
          {errors.abilityLevel ? <p id="abilityLevel-error" role="alert" className="mt-1.5 text-sm text-red-600">{errors.abilityLevel}</p> : null}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor="notes" className="block text-sm font-semibold text-navy-800">
            Notes <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <span className="text-xs text-slate-400">{values.notes.length}/500</span>
        </div>
        <Textarea
          id="notes"
          maxLength={500}
          value={values.notes}
          disabled={submitting}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "notes-error" : "notes-description"}
          className={fieldClass(errors.notes)}
          placeholder="Add any helpful information about this swimmer."
          onChange={(event) => updateField("notes", event.target.value)}
          onBlur={() => validateField("notes")}
        />
        <p id="notes-description" className="mt-1.5 text-xs text-slate-500">
          Keep medical or sensitive information out of general notes.
        </p>
        {errors.notes ? <p id="notes-error" role="alert" className="mt-1.5 text-sm text-red-600">{errors.notes}</p> : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        {submitting ? (
          <span className="inline-flex h-12 items-center justify-center px-6 text-sm text-slate-500">
            Please wait…
          </span>
        ) : (
          <ButtonLink href="/parent" variant="secondary" className="w-full sm:w-auto">
            Cancel
          </ButtonLink>
        )}
        <Button type="submit" disabled={submitting} className="w-full sm:min-w-44 sm:w-auto">
          {submitting ? submittingLabel : submitLabel}
        </Button>
      </div>
    </form>
  );
}
