"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  confirmingLabel: string;
  confirming: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel,
  confirmingLabel,
  confirming,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) {
  useEffect(() => {
    if (!open) return;
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && !confirming) onCancel();
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [confirming, onCancel, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/55 p-4 backdrop-blur-sm" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !confirming) onCancel();
    }}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" aria-describedby="confirm-description" className="w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 shadow-[0_28px_90px_rgba(15,23,42,0.3)] sm:p-7">
        <h2 id="confirm-title" className="text-xl font-semibold text-navy-900">{title}</h2>
        <p id="confirm-description" className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onCancel} disabled={confirming} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button autoFocus onClick={onConfirm} disabled={confirming} className="w-full bg-red-600 hover:bg-red-700 focus-visible:outline-red-500 sm:w-auto">
            {confirming ? confirmingLabel : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
