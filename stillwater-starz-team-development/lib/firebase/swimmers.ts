import {
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";

import { swimmersCollection } from "@/lib/firebase/firestore";
import type { SwimmerFields } from "@/lib/swimmer-validation";

export interface Swimmer extends SwimmerFields {
  swimmerId: string;
  parentId: string;
  active: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export class SwimmerAccessError extends Error {
  constructor() {
    super("The requested swimmer is not available.");
    this.name = "SwimmerAccessError";
  }
}

function mapSwimmer(document: QueryDocumentSnapshot<DocumentData>): Swimmer {
  const data = document.data();
  return {
    swimmerId: data.swimmerId ?? document.id,
    parentId: data.parentId,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
    abilityLevel: data.abilityLevel,
    notes: data.notes ?? "",
    active: data.active !== false,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

function assertOwner(swimmer: Swimmer, parentId: string) {
  if (swimmer.parentId !== parentId) throw new SwimmerAccessError();
}

export async function getParentSwimmers(parentId: string): Promise<Swimmer[]> {
  const snapshot = await getDocs(
    query(swimmersCollection, where("parentId", "==", parentId)),
  );

  return snapshot.docs.map(mapSwimmer).sort((first, second) => {
    if (first.active !== second.active) return first.active ? -1 : 1;
    return `${first.lastName} ${first.firstName}`.localeCompare(
      `${second.lastName} ${second.firstName}`,
    );
  });
}

export async function getParentSwimmer(swimmerId: string, parentId: string) {
  const snapshot = await getDoc(doc(swimmersCollection, swimmerId));
  if (!snapshot.exists()) return null;

  const swimmer = mapSwimmer(snapshot);
  assertOwner(swimmer, parentId);
  return swimmer;
}

export async function createParentSwimmer(parentId: string, fields: SwimmerFields) {
  const swimmerReference = doc(swimmersCollection);
  const swimmer: Omit<Swimmer, "createdAt" | "updatedAt"> = {
    swimmerId: swimmerReference.id,
    parentId,
    firstName: fields.firstName.trim(),
    lastName: fields.lastName.trim(),
    dateOfBirth: fields.dateOfBirth,
    abilityLevel: fields.abilityLevel,
    notes: fields.notes.trim(),
    active: true,
  };

  await setDoc(swimmerReference, {
    ...swimmer,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return swimmerReference.id;
}

export async function updateParentSwimmer(
  swimmerId: string,
  parentId: string,
  fields: SwimmerFields,
) {
  const existing = await getParentSwimmer(swimmerId, parentId);
  if (!existing) throw new SwimmerAccessError();

  await updateDoc(doc(swimmersCollection, swimmerId), {
    firstName: fields.firstName.trim(),
    lastName: fields.lastName.trim(),
    dateOfBirth: fields.dateOfBirth,
    abilityLevel: fields.abilityLevel,
    notes: fields.notes.trim(),
    updatedAt: serverTimestamp(),
  });
}

export async function softDeleteParentSwimmer(swimmerId: string, parentId: string) {
  const existing = await getParentSwimmer(swimmerId, parentId);
  if (!existing) throw new SwimmerAccessError();

  await updateDoc(doc(swimmersCollection, swimmerId), {
    active: false,
    updatedAt: serverTimestamp(),
  });
}
