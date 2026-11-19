/**
 * FOUND — Firestore Security Rules Unit Tests
 *
 * Runs against the local Firebase Emulator (firestore + auth).
 * Never touches the production database.
 *
 * Run from the FOUND repo root with:
 *   firebase emulators:exec --only firestore,auth --project found-d8728 "npm test --prefix firebase"
 *
 * Uses @firebase/rules-unit-testing v5 API:
 *   - initializeTestEnvironment({ firestore: { rules: <file content>, host, port } })
 *   - testEnv.authenticatedContext(uid, tokenOptions?) / unauthenticatedContext()
 *   - assertSucceeds(promise) / assertFails(promise)
 *   - testEnv.withSecurityRulesDisabled(fn) — simulates Admin SDK writes for server-only docs
 *
 * Coverage:
 *  - users/{uid}: owner read/update, unauthorized access, role-escalation prevention
 *  - profiles/{uid}: public visibility, matches-only (deterministic ID), private restriction
 *  - matches/{match_{a}_{b}}: no forged creation, no unauthorized update
 *  - conversations/messages: matched-only messaging, unauthorized access denied
 *  - preferences/{uid}: private
 *  - blocks/{uid}/users, reports/{id}: permissions
 *  - admin: authorized access, escalation prevention
 *  - favorites & notifications: owner-scoped
 *  - deny-by-default catch-all
 */

import * as fs from "fs";
import * as path from "path";
import {
  initializeTestEnvironment,
  RulesTestContext,
  RulesTestEnvironment,
  assertSucceeds,
  assertFails,
} from "@firebase/rules-unit-testing";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { describe, beforeAll, afterAll, beforeEach } from "@jest/globals";

let testEnv: RulesTestEnvironment;
const RULES_PATH = path.resolve(__dirname, "../firestore.rules");

beforeAll(async () => {
  const rulesContent = fs.readFileSync(RULES_PATH, "utf8");
  testEnv = await initializeTestEnvironment({
    projectId: "found-d8728",
    firestore: {
      rules: rulesContent,
      host: "127.0.0.1",
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const matchId = (uid1: string, uid2: string) => {
  const [a, b] = [uid1, uid2].sort();
  return `match_${a}_${b}`;
};

function ctx(uid: string | null, opts?: { isAdmin?: boolean; emailVerified?: boolean }) {
  if (uid === null) return testEnv.unauthenticatedContext();
  return testEnv.authenticatedContext(uid, {
    ...(opts?.isAdmin !== undefined ? { isAdmin: opts.isAdmin } : {}),
    ...(opts?.emailVerified !== undefined ? { email_verified: opts.emailVerified } : {}),
  });
}

/**
 * Seed a user account. Uses privileged seeding because user docs are normally
 * created server-side; seeding them here simulates the backend/Admin SDK path.
 */
async function seedUser(
  uid: string,
  overrides: {
    isAdmin?: boolean;
    accountStatus?: "active" | "hidden" | "suspended";
    onboardingStatus?: "incomplete" | "complete";
    emailVerified?: boolean;
  } = {}
) {
  const {
    isAdmin = false,
    accountStatus = "active",
    onboardingStatus = "complete",
    emailVerified = true,
  } = overrides;
  await testEnv.withSecurityRulesDisabled(async (c) => {
    await setDoc(doc(c.firestore(), "users", uid), {
      uid,
      email: `${uid}@example.com`,
      displayName: uid,
      emailVerified,
      accountStatus,
      onboardingStatus,
      isAdmin,
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    });
  });
}

async function seedProfile(
  uid: string,
  visibility: "public" | "private" | "matches-only" = "public"
) {
  const c = ctx(uid);
  await setDoc(doc(c.firestore(), "profiles", uid), {
    uid,
    publicDisplayName: uid,
    age: 28,
    generalLocation: "Mumbai",
    education: "B.Tech",
    occupation: "Engineer",
    biography: "Hello",
    interests: ["music"],
    visibility,
    updatedAt: "2026-01-01T00:00:00Z",
  });
}

/**
 * Seed a match document via privileged seeding. Matches are server-only
 * (allow create: if false), so they must be seeded with rules disabled.
 */
async function seedMatch(uid1: string, uid2: string, accepted = true) {
  const [a, b] = [uid1, uid2].sort();
  const mid = matchId(a, b);
  await testEnv.withSecurityRulesDisabled(async (c) => {
    await setDoc(doc(c.firestore(), "matches", mid), {
      matchId: mid,
      participantOne: a,
      participantTwo: b,
      accepted,
      matchedAt: "2026-01-01T00:00:00Z",
    });
  });
}

/**
 * Seed a conversation (server-only) plus one message via privileged seeding.
 */
async function seedConversation(uid1: string, uid2: string): Promise<string> {
  const [a, b] = [uid1, uid2].sort();
  const mid = matchId(a, b);
  let convId: string;
  await testEnv.withSecurityRulesDisabled(async (c) => {
    const convRef = await addDoc(collection(c.firestore(), "conversations"), {
      participantOne: a,
      participantTwo: b,
      matchId: mid,
      createdAt: "2026-01-01T00:00:00Z",
      lastMessageAt: "2026-01-01T00:00:00Z",
    });
    convId = convRef.id;
    await addDoc(
      collection(c.firestore(), "conversations", convId, "messages"),
      {
        senderUid: a,
        content: "Hi there",
        createdAt: "2026-01-01T00:00:00Z",
      }
    );
  });
  return convId!;
}

/** Seed a notification item via privileged seeding (server-only create). */
async function seedNotification(uid: string, id: string, overrides: Record<string, unknown> = {}) {
  await testEnv.withSecurityRulesDisabled(async (c) => {
    await setDoc(
      doc(c.firestore(), "notifications", uid, "items", id),
      {
        type: "match",
        read: false,
        createdAt: "2026-01-01T00:00:00Z",
        ...overrides,
      }
    );
  });
}

async function readDoc(c: RulesTestContext, path: string) {
  const parts = path.split("/");
  const docPath = parts.slice(0, -1).join("/");
  const docId = parts[parts.length - 1];
  return getDoc(doc(c.firestore(), docPath, docId));
}

async function readCollection(c: RulesTestContext, collPath: string) {
  return getDocs(collection(c.firestore(), collPath));
}

// ---------------------------------------------------------------------------
// users/{uid} — private account data
// ---------------------------------------------------------------------------

describe("users/{uid} — private account", () => {
  beforeEach(async () => {
    await seedUser("alice");
  });

  test("owner can read their own account", async () => {
    await assertSucceeds(readDoc(ctx("alice"), "users/alice"));
  });

  test("owner can update their own account (non-sensitive fields)", async () => {
    await assertSucceeds(
      updateDoc(doc(ctx("alice").firestore(), "users", "alice"), {
        displayName: "Alice New",
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("owner CANNOT escalate isAdmin via update", async () => {
    await assertFails(
      updateDoc(doc(ctx("alice").firestore(), "users", "alice"), {
        isAdmin: true,
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("owner CANNOT change accountStatus via update", async () => {
    await assertFails(
      updateDoc(doc(ctx("alice").firestore(), "users", "alice"), {
        accountStatus: "suspended",
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("owner CANNOT change isVerified via update", async () => {
    await assertFails(
      updateDoc(doc(ctx("alice").firestore(), "users", "alice"), {
        isVerified: true,
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("unauthenticated user CANNOT read another user's account", async () => {
    await assertFails(readDoc(ctx(null), "users/alice"));
  });

  test("another user CANNOT read alice's account", async () => {
    await seedUser("bob");
    await assertFails(readDoc(ctx("bob"), "users/alice"));
  });

  test("non-admin CANNOT delete a user", async () => {
    await assertFails(deleteDoc(doc(ctx("alice").firestore(), "users", "alice")));
  });
});

// ---------------------------------------------------------------------------
// profiles/{uid} — public profile visibility
// ---------------------------------------------------------------------------

describe("profiles/{uid} — visibility", () => {
  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
  });

  test("owner can read their own public profile", async () => {
    await seedProfile("alice", "public");
    await assertSucceeds(readDoc(ctx("alice"), "profiles/alice"));
  });

  test("any authenticated user can read a public profile", async () => {
    await seedProfile("alice", "public");
    await assertSucceeds(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("public profile denied when account suspended", async () => {
    await seedUser("alice", { accountStatus: "suspended" });
    await seedProfile("alice", "public");
    await assertFails(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("public profile allowed when account hidden", async () => {
    await seedUser("alice", { accountStatus: "hidden" });
    await seedProfile("alice", "public");
    await assertSucceeds(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("private profile NOT readable by others", async () => {
    await seedProfile("alice", "private");
    await assertFails(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("private profile IS readable by owner", async () => {
    await seedProfile("alice", "private");
    await assertSucceeds(readDoc(ctx("alice"), "profiles/alice"));
  });

  test("matches-only profile NOT readable without a match", async () => {
    await seedProfile("alice", "matches-only");
    await assertFails(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("matches-only profile readable by a mutually matched user", async () => {
    await seedProfile("alice", "matches-only");
    await seedMatch("alice", "bob");
    await assertSucceeds(readDoc(ctx("bob"), "profiles/alice"));
  });

  test("owner can create their own profile with matching uid", async () => {
    await assertSucceeds(
      setDoc(doc(ctx("alice").firestore(), "profiles", "alice"), {
        uid: "alice",
        publicDisplayName: "Alice",
        visibility: "public",
        updatedAt: "2026-01-01T00:00:00Z",
      })
    );
  });

  test("user CANNOT create a profile with someone else's uid", async () => {
    await assertFails(
      setDoc(doc(ctx("alice").firestore(), "profiles", "bob"), {
        uid: "bob",
        publicDisplayName: "Bob",
        visibility: "public",
        updatedAt: "2026-01-01T00:00:00Z",
      })
    );
  });

  test("non-admin CANNOT delete a profile", async () => {
    await seedProfile("alice", "public");
    await assertFails(deleteDoc(doc(ctx("bob").firestore(), "profiles", "alice")));
  });
});

// ---------------------------------------------------------------------------
// matches/{match_{a}_{b}} — deterministic match IDs
// ---------------------------------------------------------------------------

describe("matches — no forging, no unauthorized update", () => {
  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
    await seedUser("carol");
  });

  test("users CANNOT create a match document directly (server-only)", async () => {
    const mid = matchId("alice", "bob");
    await assertFails(
      setDoc(doc(ctx("alice").firestore(), "matches", mid), {
        matchId: mid,
        participantOne: "alice",
        participantTwo: "bob",
        accepted: true,
        matchedAt: "2026-01-01T00:00:00Z",
      })
    );
  });

  test("participants can read their own match", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertSucceeds(readDoc(ctx("alice"), "matches/" + mid));
    await assertSucceeds(readDoc(ctx("bob"), "matches/" + mid));
  });

  test("non-participant CANNOT read a match", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertFails(readDoc(ctx("carol"), "matches/" + mid));
  });

  test("participants can update only the accepted flag", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertSucceeds(
      updateDoc(doc(ctx("alice").firestore(), "matches", mid), {
        accepted: false,
      })
    );
  });

  test("user CANNOT update a match field other than accepted", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertFails(
      updateDoc(doc(ctx("alice").firestore(), "matches", mid), {
        participantTwo: "carol",
      })
    );
  });

  test("non-participant CANNOT update a match", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertFails(
      updateDoc(doc(ctx("carol").firestore(), "matches", mid), {
        accepted: false,
      })
    );
  });

  test("non-admin CANNOT delete a match", async () => {
    await seedMatch("alice", "bob");
    const mid = matchId("alice", "bob");
    await assertFails(deleteDoc(doc(ctx("bob").firestore(), "matches", mid)));
  });
});

// ---------------------------------------------------------------------------
// conversations & messages — matched-only messaging
// ---------------------------------------------------------------------------

describe("conversations/messages — matched-only", () => {
  let convId: string;

  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
    await seedUser("carol");
    await seedMatch("alice", "bob");
    convId = await seedConversation("alice", "bob");
  });

  test("matched participant can read conversation metadata", async () => {
    await assertSucceeds(readDoc(ctx("alice"), "conversations/" + convId));
    await assertSucceeds(readDoc(ctx("bob"), "conversations/" + convId));
  });

  test("matched participant can read messages", async () => {
    await assertSucceeds(
      readCollection(ctx("alice"), "conversations/" + convId + "/messages")
    );
    await assertSucceeds(
      readCollection(ctx("bob"), "conversations/" + convId + "/messages")
    );
  });

  test("matched participant can send a message as themselves", async () => {
    await assertSucceeds(
      addDoc(
        collection(ctx("alice").firestore(), "conversations", convId, "messages"),
        {
          senderUid: "alice",
          content: "Hey",
          createdAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("user CANNOT send a message claiming to be someone else", async () => {
    await assertFails(
      addDoc(
        collection(ctx("alice").firestore(), "conversations", convId, "messages"),
        {
          senderUid: "bob",
          content: "Impersonation",
          createdAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("non-participant CANNOT read conversation metadata", async () => {
    await assertFails(readDoc(ctx("carol"), "conversations/" + convId));
  });

  test("non-participant CANNOT read messages", async () => {
    await assertFails(
      readCollection(ctx("carol"), "conversations/" + convId + "/messages")
    );
  });

  test("non-participant CANNOT send a message", async () => {
    await assertFails(
      addDoc(
        collection(ctx("carol").firestore(), "conversations", convId, "messages"),
        {
          senderUid: "carol",
          content: "Hello",
          createdAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("messages are immutable — update denied", async () => {
    const snap = await readCollection(ctx("alice"), "conversations/" + convId + "/messages");
    const msgId = snap.docs[0].id;
    await assertFails(
      updateDoc(
        doc(ctx("alice").firestore(), "conversations", convId, "messages", msgId),
        { content: "edited" }
      )
    );
  });

  test("non-admin CANNOT delete a message", async () => {
    const snap = await readCollection(ctx("alice"), "conversations/" + convId + "/messages");
    const msgId = snap.docs[0].id;
    await assertFails(
      deleteDoc(
        doc(ctx("bob").firestore(), "conversations", convId, "messages", msgId)
      )
    );
  });
});

// ---------------------------------------------------------------------------
// preferences/{uid} — private
// ---------------------------------------------------------------------------

describe("preferences/{uid} — private", () => {
  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
    // Seed preferences via privileged seeding (user create is allowed but we
    // want a known baseline that survives the beforeEach clear).
    await testEnv.withSecurityRulesDisabled(async (c) => {
      await setDoc(doc(c.firestore(), "preferences", "alice"), {
        uid: "alice",
        preferredAgeMin: 25,
        updatedAt: "2026-01-01T00:00:00Z",
      });
    });
  });

  test("owner can read their own preferences", async () => {
    await assertSucceeds(readDoc(ctx("alice"), "preferences/alice"));
  });

  test("owner can create/update their own preferences", async () => {
    await assertSucceeds(
      updateDoc(doc(ctx("alice").firestore(), "preferences", "alice"), {
        preferredAgeMax: 35,
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("another user CANNOT read private preferences", async () => {
    await assertFails(readDoc(ctx("bob"), "preferences/alice"));
  });

  test("another user CANNOT write to someone else's preferences", async () => {
    await assertFails(
      setDoc(doc(ctx("bob").firestore(), "preferences", "alice"), {
        uid: "alice",
        preferredAgeMin: 18,
        updatedAt: "2026-02-01T00:00:00Z",
      })
    );
  });

  test("owner can delete their own preferences", async () => {
    await assertSucceeds(
      deleteDoc(doc(ctx("alice").firestore(), "preferences", "alice"))
    );
  });
});

// ---------------------------------------------------------------------------
// blocks & reports
// ---------------------------------------------------------------------------

describe("blocks/{uid}/users & reports", () => {
  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
    await seedUser("carol");
  });

  test("owner can block another user", async () => {
    await assertSucceeds(
      setDoc(
        doc(ctx("alice").firestore(), "blocks", "alice", "users", "bob"),
        {
          blockedBy: "alice",
          blockedUser: "bob",
          blockedAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("owner can read their own block list", async () => {
    await setDoc(
      doc(ctx("alice").firestore(), "blocks", "alice", "users", "bob"),
      {
        blockedBy: "alice",
        blockedUser: "bob",
        blockedAt: "2026-01-01T00:00:00Z",
      }
    );
    await assertSucceeds(
      readDoc(ctx("alice"), "blocks/alice/users/bob")
    );
  });

  test("blocked user CANNOT read the block entry", async () => {
    await setDoc(
      doc(ctx("alice").firestore(), "blocks", "alice", "users", "bob"),
      {
        blockedBy: "alice",
        blockedUser: "bob",
        blockedAt: "2026-01-01T00:00:00Z",
      }
    );
    await assertFails(readDoc(ctx("bob"), "blocks/alice/users/bob"));
  });

  test("another user CANNOT block on behalf of owner", async () => {
    await assertFails(
      setDoc(
        doc(ctx("bob").firestore(), "blocks", "alice", "users", "carol"),
        {
          blockedBy: "alice",
          blockedUser: "carol",
          blockedAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("any authenticated user can file a report", async () => {
    await assertSucceeds(
      setDoc(doc(ctx("bob").firestore(), "reports", "r1"), {
        reportedUid: "alice",
        reason: "spam",
        createdAt: "2026-01-01T00:00:00Z",
      })
    );
  });

  test("non-admin CANNOT read a report", async () => {
    await setDoc(doc(ctx("bob").firestore(), "reports", "r1"), {
      reportedUid: "alice",
      reason: "spam",
      createdAt: "2026-01-01T00:00:00Z",
    });
    await assertFails(readDoc(ctx("bob"), "reports/r1"));
  });
});

// ---------------------------------------------------------------------------
// Admin authorization & role escalation prevention
// ---------------------------------------------------------------------------

describe("admin authorization", () => {
  beforeEach(async () => {
    await seedUser("admin", { isAdmin: true });
    await seedUser("alice");
    await seedProfile("alice", "private");
  });

  test("admin can read any user's private account", async () => {
    await assertSucceeds(readDoc(ctx("admin", { isAdmin: true }), "users/alice"));
  });

  test("admin can read private profiles", async () => {
    await assertSucceeds(readDoc(ctx("admin", { isAdmin: true }), "profiles/alice"));
  });

  test("admin can read private preferences", async () => {
    await testEnv.withSecurityRulesDisabled(async (c) => {
      await setDoc(doc(c.firestore(), "preferences", "alice"), {
        uid: "alice",
        preferredAgeMin: 25,
        updatedAt: "2026-01-01T00:00:00Z",
      });
    });
    await assertSucceeds(
      readDoc(ctx("admin", { isAdmin: true }), "preferences/alice")
    );
  });

  test("admin can delete a user account", async () => {
    await assertSucceeds(
      deleteDoc(
        doc(ctx("admin", { isAdmin: true }).firestore(), "users", "alice")
      )
    );
  });

  test("admin can read reports", async () => {
    await setDoc(doc(ctx("alice").firestore(), "reports", "r1"), {
      reportedUid: "bob",
      reason: "spam",
      createdAt: "2026-01-01T00:00:00Z",
    });
    await assertSucceeds(
      readDoc(ctx("admin", { isAdmin: true }), "reports/r1")
    );
  });

  test("admin can update reports", async () => {
    await setDoc(doc(ctx("alice").firestore(), "reports", "r1"), {
      reportedUid: "bob",
      reason: "spam",
      createdAt: "2026-01-01T00:00:00Z",
    });
    await assertSucceeds(
      updateDoc(
        doc(ctx("admin", { isAdmin: true }).firestore(), "reports", "r1"),
        { status: "reviewed" }
      )
    );
  });

  test("admin CANNOT change isAdmin/accountStatus/isVerified via user update", async () => {
    await assertFails(
      updateDoc(
        doc(ctx("admin", { isAdmin: true }).firestore(), "users", "admin"),
        { displayName: "Super Admin", isAdmin: false, updatedAt: "2026-02-01T00:00:00Z" }
      )
    );
  });

  test("non-admin CANNOT access admin-only report data", async () => {
    await setDoc(doc(ctx("alice").firestore(), "reports", "r1"), {
      reportedUid: "bob",
      reason: "spam",
      createdAt: "2026-01-01T00:00:00Z",
    });
    await assertFails(readDoc(ctx("alice"), "reports/r1"));
  });
});

// ---------------------------------------------------------------------------
// favorites & notifications — owner-scoped subcollections
// ---------------------------------------------------------------------------

describe("favorites & notifications — owner-scoped", () => {
  beforeEach(async () => {
    await seedUser("alice");
    await seedUser("bob");
  });

  test("owner can add a favorite", async () => {
    await assertSucceeds(
      setDoc(
        doc(
          ctx("alice").firestore(),
          "favorites",
          "alice",
          "items",
          "bob"
        ),
        {
          favoritedBy: "alice",
          favoritedProfile: "bob",
          createdAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("owner can read their favorites", async () => {
    await setDoc(
      doc(
        ctx("alice").firestore(),
        "favorites",
        "alice",
        "items",
        "bob"
      ),
      {
        favoritedBy: "alice",
        favoritedProfile: "bob",
        createdAt: "2026-01-01T00:00:00Z",
      }
    );
    await assertSucceeds(
      readDoc(ctx("alice"), "favorites/alice/items/bob")
    );
  });

  test("another user CANNOT read someone else's favorites", async () => {
    await setDoc(
      doc(
        ctx("alice").firestore(),
        "favorites",
        "alice",
        "items",
        "bob"
      ),
      {
        favoritedBy: "alice",
        favoritedProfile: "bob",
        createdAt: "2026-01-01T00:00:00Z",
      }
    );
    await assertFails(
      readDoc(ctx("bob"), "favorites/alice/items/bob")
    );
  });

  test("user CANNOT add a favorite under someone else's uid", async () => {
    await assertFails(
      setDoc(
        doc(
          ctx("bob").firestore(),
          "favorites",
          "alice",
          "items",
          "carol"
        ),
        {
          favoritedBy: "alice",
          favoritedProfile: "carol",
          createdAt: "2026-01-01T00:00:00Z",
        }
      )
    );
  });

  test("owner can delete their own favorite", async () => {
    await setDoc(
      doc(
        ctx("alice").firestore(),
        "favorites",
        "alice",
        "items",
        "bob"
      ),
      {
        favoritedBy: "alice",
        favoritedProfile: "bob",
        createdAt: "2026-01-01T00:00:00Z",
      }
    );
    await assertSucceeds(
      deleteDoc(
        doc(
          ctx("alice").firestore(),
          "favorites",
          "alice",
          "items",
          "bob"
        )
      )
    );
  });

  test("owner can update their own notification (e.g. mark read)", async () => {
    await seedNotification("alice", "n1");
    await assertSucceeds(
      updateDoc(
        doc(
          ctx("alice").firestore(),
          "notifications",
          "alice",
          "items",
          "n1"
        ),
        { read: true }
      )
    );
  });

  test("another user CANNOT read someone else's notifications", async () => {
    await seedNotification("alice", "n1");
    await assertFails(
      readDoc(ctx("bob"), "notifications/alice/items/n1")
    );
  });
});

// ---------------------------------------------------------------------------
// Global deny-by-default catch-all
// ---------------------------------------------------------------------------

describe("deny-by-default catch-all", () => {
  beforeEach(async () => {
    await seedUser("alice");
  });

  test("unauthenticated user cannot write anywhere", async () => {
    await assertFails(
      setDoc(doc(ctx(null).firestore(), "users", "alice"), { uid: "alice" })
    );
  });

  test("arbitrary unknown collection is denied", async () => {
    await assertFails(
      setDoc(doc(ctx("alice").firestore(), "secrets", "1"), { data: "x" })
    );
  });
});
