"use client";

import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { ChevronDownIcon, LogoutIcon } from "@/components/dashboard/icons";
import { useSignOut } from "@/components/dashboard/use-sign-out";

export function ProfileMenu() {
  const { profile } = useAuth();
  const { signOut, signingOut, signOutError } = useSignOut();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const initials = `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.toUpperCase();

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 pr-2.5 text-left shadow-sm transition-colors hover:border-navy-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-500 sm:gap-3 sm:pr-3"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-xs font-bold text-white">
          {initials || "P"}
        </span>
        <span className="hidden min-w-0 sm:block">
          <span className="block max-w-40 truncate text-sm font-semibold text-navy-900">
            {profile?.firstName} {profile?.lastName}
          </span>
          <span className="block text-xs text-slate-500">Parent</span>
        </span>
        <ChevronDownIcon className="h-4 w-4 text-slate-500" />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.16)]"
        >
          <div className="border-b border-slate-100 px-3 py-3">
            <p className="font-semibold text-navy-900">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="mt-1 truncate text-sm text-slate-500">{profile?.email}</p>
          </div>
          {signOutError ? (
            <p role="alert" className="mx-2 mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
              {signOutError}
            </p>
          ) : null}
          <button
            type="button"
            role="menuitem"
            disabled={signingOut}
            onClick={signOut}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500 disabled:opacity-50"
          >
            <LogoutIcon className="h-5 w-5" />
            {signingOut ? "Signing Out…" : "Sign Out"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
