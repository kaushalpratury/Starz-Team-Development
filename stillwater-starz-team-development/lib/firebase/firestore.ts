import { collection, doc } from "firebase/firestore";

import { firestore } from "@/lib/firebase/client";

export { firestore };

export const collectionNames = {
  users: "users",
  swimmers: "swimmers",
  coaches: "coaches",
  availability: "availability",
  bookings: "bookings",
  notifications: "notifications",
  announcements: "announcements",
  settings: "settings",
  auditLogs: "auditLogs",
} as const;

export type CollectionName = keyof typeof collectionNames;

export function collectionRef(name: CollectionName) {
  return collection(firestore, collectionNames[name]);
}

export function documentRef(name: CollectionName, documentId: string) {
  return doc(firestore, collectionNames[name], documentId);
}

export const usersCollection = collectionRef("users");
export const swimmersCollection = collectionRef("swimmers");
export const coachesCollection = collectionRef("coaches");
export const availabilityCollection = collectionRef("availability");
export const bookingsCollection = collectionRef("bookings");
export const notificationsCollection = collectionRef("notifications");
export const announcementsCollection = collectionRef("announcements");
export const settingsCollection = collectionRef("settings");
export const auditLogsCollection = collectionRef("auditLogs");
