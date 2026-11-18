/**
 * Firestore helper utilities for FOUND.
 * Provides typed helpers for common Firestore operations
 * while keeping security rules as the source of truth.
 */
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  DocumentData,
  FieldValue,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Create or update a user document in the `users` collection.
 * Uses the Firebase Auth UID as the document ID.
 */
export async function createUserDocument(
  uid: string,
  data: {
    displayName: string;
    email: string;
    dateOfBirth: string;
    accountStatus?: 'active' | 'suspended' | 'hidden';
    emailVerified?: boolean;
    onboardingStatus?: 'incomplete' | 'complete';
  }
) {
  const userRef = doc(db, 'users', uid);
  await setDoc(
    userRef,
    {
      uid,
      displayName: data.displayName,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      accountStatus: data.accountStatus ?? 'active',
      emailVerified: data.emailVerified ?? false,
      onboardingStatus: data.onboardingStatus ?? 'incomplete',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Fetch a user document from Firestore.
 */
export async function getUserDocument(uid: string) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as DocumentData;
}

/**
 * Create or update a public profile document.
 */
export async function createProfileDocument(
  uid: string,
  data: {
    publicDisplayName: string;
    age?: number;
    generalLocation?: string;
    education?: string;
    occupation?: string;
    biography?: string;
    interests?: string[];
    visibility?: 'public' | 'private' | 'matches-only';
  }
) {
  const profileRef = doc(db, 'profiles', uid);
  await setDoc(
    profileRef,
    {
      uid,
      publicDisplayName: data.publicDisplayName,
      age: data.age,
      generalLocation: data.generalLocation,
      education: data.education,
      occupation: data.occupation,
      biography: data.biography,
      interests: data.interests ?? [],
      visibility: data.visibility ?? 'private',
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Fetch a public profile document (safe fields only).
 */
export async function getProfileDocument(uid: string) {
  const profileRef = doc(db, 'profiles', uid);
  const snapshot = await getDoc(profileRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as DocumentData;
}

/**
 * Update profile document.
 */
export async function updateProfileDocument(uid: string, data: Partial<DocumentData>) {
  const profileRef = doc(db, 'profiles', uid);
  await updateDoc(profileRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Calculate derived public age from date of birth.
 */
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

/**
 * Check if a user is at least 18 years old.
 */
export function isAdult(dateOfBirth: string): boolean {
  return calculateAge(dateOfBirth) >= 18;
}

export { serverTimestamp, Timestamp, FieldValue };
