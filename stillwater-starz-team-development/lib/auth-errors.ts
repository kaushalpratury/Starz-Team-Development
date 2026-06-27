import { FirebaseError } from "firebase/app";

import { AuthFlowError } from "@/lib/firebase/auth";

const firebaseMessages: Record<string, string> = {
  "auth/email-already-in-use": "An account already exists with that email address.",
  "auth/invalid-credential": "The email or password you entered is incorrect.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/network-request-failed": "We could not connect. Check your internet connection and try again.",
  "auth/too-many-requests": "Too many attempts were made. Please wait a few minutes and try again.",
  "auth/user-disabled": "This account has been disabled. Please contact Stillwater Starz for help.",
  "auth/user-not-found": "We could not find an account with that email address.",
  "auth/weak-password": "Please choose a stronger password with at least 8 characters.",
  "auth/wrong-password": "The email or password you entered is incorrect.",
  "permission-denied": "We could not complete that request. Please contact Stillwater Starz for help.",
  "firestore/permission-denied": "We could not complete that request. Please contact Stillwater Starz for help.",
};

export function getFriendlyAuthError(error: unknown) {
  if (error instanceof AuthFlowError) {
    return error.message;
  }

  if (error instanceof FirebaseError) {
    return firebaseMessages[error.code] ?? "Something went wrong. Please try again.";
  }

  return "Something went wrong. Please try again.";
}
