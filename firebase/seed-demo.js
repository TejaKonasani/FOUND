/**
 * FOUND — Demo Account Seed Script
 *
 * Creates a stable, fictional demo account for development/testing.
 * Runs ONLY against the Firebase Auth + Firestore Emulators.
 * Never modifies production Firebase data.
 *
 * Usage:
 *   npm run demo:seed          # create/update demo account (idempotent)
 *   npm run demo:seed --reset  # reset demo account to original state
 *
 * Requirements before running:
 *   1. Firebase emulators running: firebase emulators:start --only auth,firestore
 *   2. Env vars set (firebase-admin v14.x connects via env vars):
 *      FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099
 *      FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
 *      FIREBASE_PROJECT_ID=found-d8728
 *
 * Demo account credentials (for reference — do not commit secrets):
 *   Email:    demo@found.in
 *   Password: DemoPassword123!
 *   UID:      demo-found-user (stable, reused across seeds)
 */

const admin = require("firebase-admin");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "found-d8728";
const AUTH_EMULATOR = process.env.FIREBASE_AUTH_EMULATOR_HOST;
const FIRESTORE_EMULATOR = process.env.FIRESTORE_EMULATOR_HOST;

const DEMO = {
  uid: "demo-found-user",
  email: "demo@found.in",
  password: "DemoPassword123!",
  displayName: "Ananya Sharma",
};

const RESET = process.argv.includes("--reset");

// ---------------------------------------------------------------------------
// Safety guard: refuse to run against production
// ---------------------------------------------------------------------------

if (!AUTH_EMULATOR || !FIRESTORE_EMULATOR) {
  console.error(
    "\n[FOUND Demo Seed] ABORTED.\n" +
      "This script runs ONLY against the Firebase Emulators.\n" +
      "Start the emulators first and set env vars:\n\n" +
      "  firebase emulators:start --only auth,firestore\n\n" +
      "Or set env vars:\n" +
      "  FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099\n" +
      "  FIRESTORE_EMULATOR_HOST=127.0.0.1:8080\n" +
      "  FIREBASE_PROJECT_ID=found-d8728\n"
  );
  process.exit(1);
}

console.log(`[FOUND Demo Seed] Target project: ${PROJECT_ID}`);
console.log(`[FOUND Demo Seed] Auth emulator: ${AUTH_EMULATOR}`);
console.log(`[FOUND Demo Seed] Firestore emulator: ${FIRESTORE_EMULATOR}`);
console.log(`[FOUND Demo Seed] Mode: ${RESET ? "RESET demo account" : "SEED demo account"}`);

// ---------------------------------------------------------------------------
// Initialize Admin SDK against the emulator
// firebase-admin v14.x connects to emulators via env vars set BEFORE init.
// ---------------------------------------------------------------------------

admin.initializeApp({
  projectId: PROJECT_ID,
  credential: admin.credential.applicationDefault(),
});

const auth = admin.auth();
const db = admin.firestore();

// ---------------------------------------------------------------------------
// Fictional demo profile data (Indian matchmaking context)
// ---------------------------------------------------------------------------

const DEMO_PROFILE = {
  uid: DEMO.uid,
  publicDisplayName: "Ananya",
  age: 27,
  generalLocation: "Mumbai",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  education: "B.Tech, IIT Bombay",
  occupation: "Product Manager at a Fintech Startup",
  height: "5'5\"",
  religion: "Hindu",
  motherTongue: "Marathi",
  familyType: "Nuclear Family",
  familyValues: "Moderate",
  about:
    "I'm a curious, warm-hearted person who loves long conversations over chai and late-night stargazing. " +
    "By day I build products that make finance simpler; by night I'm reading, traveling, or trying new recipes. " +
    "I value kindness, ambition, and a good sense of humor. Looking for someone who understands that the best " +
    "relationships are built on mutual respect, shared laughter, and growing together.",
  interests: ["Reading", "Travel", "Cooking", "Yoga", "Photography", "Music"],
  visibility: "public",
  profileCompletion: 100,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

const DEMO_PREFERENCES = {
  uid: DEMO.uid,
  ageMin: 27,
  ageMax: 33,
  preferredLocations: ["Mumbai", "Pune", "Bengaluru"],
  preferredEducation: ["B.Tech", "M.Tech", "MBA", "MS"],
  preferredProfession: ["Technology", "Business", "Medicine", "Finance"],
  preferredReligion: "Open to all",
  preferredMotherTongue: "Open to all",
  mustHave: ["Kind", "Ambitious"],
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

const DEMO_USER = {
  uid: DEMO.uid,
  email: DEMO.email,
  displayName: DEMO.displayName,
  emailVerified: true,
  accountStatus: "active",
  onboardingStatus: "complete",
  isAdmin: false,
  isVerified: false,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  updatedAt: new Date("2026-01-01T00:00:00Z"),
};

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seedDemoAccount() {
  try {
    // 1. Create/update the Auth user (stable UID)
    let userRecord;
    try {
      userRecord = await auth.getUser(DEMO.uid);
      console.log(`[FOUND Demo Seed] Auth user ${DEMO.uid} exists.`);
    } catch (err) {
      if (err?.code === "auth/user-not-found") {
        console.log(`[FOUND Demo Seed] Creating Auth user ${DEMO.uid}...`);
        userRecord = await auth.createUser({
          uid: DEMO.uid,
          email: DEMO.email,
          password: DEMO.password,
          displayName: DEMO.displayName,
          emailVerified: true,
        });
      } else {
        throw err;
      }
    }

    // Update password/displayName if needed (idempotent)
    if (userRecord.email !== DEMO.email || userRecord.displayName !== DEMO.displayName) {
      console.log(`[FOUND Demo Seed] Updating Auth user metadata...`);
      await auth.updateUser(DEMO.uid, {
        email: DEMO.email,
        password: DEMO.password,
        displayName: DEMO.displayName,
        emailVerified: true,
      });
    }

    // 2. Seed Firestore documents (users, profiles, preferences)
    const userRef = db.collection("users").doc(DEMO.uid);
    const profileRef = db.collection("profiles").doc(DEMO.uid);
    const prefsRef = db.collection("preferences").doc(DEMO.uid);

    const userDoc = (await userRef.get()).exists;
    const profileDoc = (await profileRef.get()).exists;
    const prefsDoc = (await prefsRef.get()).exists;

    if (RESET || !userDoc) {
      console.log(`[FOUND Demo Seed] Writing users/${DEMO.uid}...`);
      await userRef.set(DEMO_USER, { merge: true });
    } else {
      console.log(`[FOUND Demo Seed] users/${DEMO.uid} exists.`);
    }

    if (RESET || !profileDoc) {
      console.log(`[FOUND Demo Seed] Writing profiles/${DEMO.uid}...`);
      await profileRef.set(DEMO_PROFILE, { merge: true });
    } else {
      console.log(`[FOUND Demo Seed] profiles/${DEMO.uid} exists.`);
    }

    if (RESET || !prefsDoc) {
      console.log(`[FOUND Demo Seed] Writing preferences/${DEMO.uid}...`);
      await prefsRef.set(DEMO_PREFERENCES, { merge: true });
    } else {
      console.log(`[FOUND Demo Seed] preferences/${DEMO.uid} exists.`);
    }

    console.log(
      `\n[FOUND Demo Seed] ✅ Demo account ready.\n` +
        `   Email:    ${DEMO.email}\n` +
        `   Password: ${DEMO.password}\n` +
        `   UID:      ${DEMO.uid}\n` +
        `   Profile:  ${DEMO_PROFILE.publicDisplayName}, ${DEMO_PROFILE.age}, ${DEMO_PROFILE.generalLocation}\n`
    );
  } catch (err) {
    console.error("\n[FOUND Demo Seed] ❌ Error:", err?.message || err);
    console.error(
      "\nMake sure the Firebase emulators are running:\n" +
        "  firebase emulators:start --only auth,firestore\n"
    );
    process.exit(1);
  } finally {
    await admin.app().delete();
  }
}

seedDemoAccount();
