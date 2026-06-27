"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { getFriendlyAuthError } from "@/lib/auth-errors";
import { signOutCurrentUser } from "@/lib/firebase/auth";

export function useSignOut() {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  async function signOut() {
    setSigningOut(true);
    setSignOutError(null);

    try {
      await signOutCurrentUser();
      router.replace("/login");
    } catch (error) {
      setSignOutError(getFriendlyAuthError(error));
      setSigningOut(false);
    }
  }

  return { signOut, signingOut, signOutError };
}
