import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type NextOrObserver,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth } from "@/lib/firebase/client";
import { firestore } from "@/lib/firebase/firestore";

export { auth };
export type { User };

export function listenToAuthState(observer: NextOrObserver<User>) {
  return onAuthStateChanged(auth, observer);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function signOutCurrentUser() {
  return signOut(auth);
}

export interface UserProfile {
  uid: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: boolean;
}

export interface ParentRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export class AuthFlowError extends Error {
  constructor(
    public readonly code: "missing-profile" | "unsupported-role" | "inactive-account",
    message: string,
  ) {
    super(message);
    this.name = "AuthFlowError";
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snapshot = await getDoc(doc(firestore, "users", uid));

  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function registerParentAccount(values: ParentRegistration) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    values.email.trim().toLowerCase(),
    values.password,
  );

  try {
    await updateProfile(credential.user, {
      displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
    });

    await setDoc(doc(firestore, "users", credential.user.uid), {
      uid: credential.user.uid,
      role: "parent",
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      active: true,
    });

    return credential.user;
  } catch (error) {
    // Avoid leaving an Authentication account without its canonical user record.
    await deleteUser(credential.user).catch(() => undefined);
    throw error;
  }
}

export async function signInParent(email: string, password: string, rememberMe: boolean) {
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password,
  );

  try {
    const profile = await getUserProfile(credential.user.uid);

    if (!profile) {
      throw new AuthFlowError(
        "missing-profile",
        "We could not find an account profile for this sign-in.",
      );
    }

    if (!profile.active) {
      throw new AuthFlowError(
        "inactive-account",
        "This account is currently inactive. Please contact Stillwater Starz for help.",
      );
    }

    if (profile.role !== "parent") {
      // TODO(Sprint 2.3): Route coach and administrator accounts to their portals.
      throw new AuthFlowError(
        "unsupported-role",
        "This sign-in page currently supports parent accounts only.",
      );
    }

    return profile;
  } catch (error) {
    await signOut(auth);
    throw error;
  }
}

export function sendParentPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email.trim().toLowerCase());
}
