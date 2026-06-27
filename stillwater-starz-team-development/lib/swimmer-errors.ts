import { FirebaseError } from "firebase/app";

import { SwimmerAccessError } from "@/lib/firebase/swimmers";

const swimmerMessages: Record<string, string> = {
  "permission-denied": "You do not have permission to manage this swimmer.",
  unavailable: "The swimmer service is temporarily unavailable. Please try again.",
  "network-request-failed": "We could not connect. Check your internet connection and try again.",
};

export function getFriendlySwimmerError(error: unknown) {
  if (error instanceof SwimmerAccessError) return error.message;
  if (error instanceof FirebaseError) {
    return swimmerMessages[error.code] ?? "We couldn't save the swimmer. Please try again.";
  }
  return "We couldn't save the swimmer. Please try again.";
}
