# FOUND — Firebase Integration Guide

This document explains how Firebase has been integrated into the FOUND matrimonial platform.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      FOUND Frontend                          │
│  Next.js 14 (App Router) + TypeScript + Tailwind + shadcn    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Firebase     │  │ AuthContext  │  │ ProtectedRoute   │   │
│  │ Client SDK   │  │ (React)      │  │                  │   │
│  │              │  │              │  │                  │   │
│  │ - auth       │  │ - user state │  │ - auth guard     │   │
│  │ - db         │  │ - emailVerified │ - loading state  │   │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────┘   │
│         │                 │                                  │
└─────────┼─────────────────┼──────────────────────────────────┘
          │                 │
          ▼                 ▼
┌──────────────────┐  ┌──────────────────────────────────────┐
│  Firebase Auth   │  │        FOUND Backend (FastAPI)        │
│  Email/Password  │  │                                       │
│  Email Verify    │  │  ┌─────────────────────────────────┐  │
│                  │  │  │ Firebase Admin SDK              │  │
│                  │  │  │ - verify_id_token               │  │
│                  │  │  │ - Firestore operations          │  │
│                  │  │  └──────────────┬──────────────────┘  │
└──────────────────┘  │                 │                     │
                      │  ┌──────────────▼──────────────────┐  │
                      │  │ firestore_repo.py               │  │
                      │  │ - users, profiles, preferences  │  │
                      │  │ - interests, matches, messages  │  │
                      │  │ - favorites, blocks             │  │
                      │  └──────────────┬──────────────────┘  │
                      └─────────────────┼─────────────────────┘
                                        │
                                        ▼
                              ┌──────────────────┐
                              │  Firestore DB    │
                              │  (found-d8728)   │
                              └──────────────────┘
```

## Setup Instructions

### 1. Frontend Environment Variables

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in values from your Firebase console:

```bash
cd apps/web
cp .env.example .env.local
```

Get the values from **Firebase Console → Project Settings → Your apps → Web app**:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=found-d8728.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=found-d8728
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=found-d8728.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 2. Backend Firebase Admin Setup

#### Option A: Service Account JSON (Recommended for production)

1. Go to **Firebase Console → Project Settings → Service Accounts**
2. Click **Generate new private key**
3. Save the JSON file as `services/api/firebase-adminsdk.json` (already gitignored)
4. Set the environment variable:

```bash
# services/api/.env
FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/firebase-adminsdk.json
```

#### Option B: GCP Application Default Credentials (GCE/Cloud Run)

Leave `FIREBASE_SERVICE_ACCOUNT_PATH` empty and run on a GCP environment with proper IAM roles.

### 3. Install Backend Dependencies

```bash
cd services/api
pip install -r requirements.txt
```

### 4. Deploy Firestore Rules and Indexes

```bash
cd firebase
firebase login
firebase deploy --only firestore:rules,firestore:indexes
```

> **Note:** Requires Firebase CLI. If not installed: `npm install -g firebase-tools`

## Firestore Data Model

### Collections

| Collection | Purpose | Access |
|------------|---------|--------|
| `users/{uid}` | Private account data | Owner only |
| `profiles/{uid}` | Public profile | Public (visibility-gated) |
| `preferences/{uid}` | Private partner preferences | Owner only |
| `interests/{interestId}` | Interest requests | Sender/Receiver |
| `matches/{matchId}` | Mutual matches | Participants |
| `conversations/{conversationId}` | Chat metadata | Participants |
| `conversations/{id}/messages/{msgId}` | Messages | Participants |
| `favorites/{uid}/items/{profileUid}` | Saved profiles | Owner |
| `notifications/{uid}/items/{id}` | User notifications | Recipient |
| `blocks/{uid}/users/{blockedUid}` | Blocked accounts | Owner |
| `reports/{reportId}` | Moderation reports | Admin only |

### Security Rules

Located in `firebase/firestore.rules`. Key principles:

- **Deny by default** — all access requires explicit rules
- **Owner-only** writes for private data (`users`, `preferences`, `notifications`)
- **Visibility-gated** public profiles (`public`, `matches-only`, `private`)
- **Mutual match** required for messaging
- **Admin-only** for moderation and account management
- **No self-interaction** (cannot interest/favorite/block yourself)

## API Endpoints (Firebase-authenticated)

All endpoints under `/api/v1` require a Firebase ID token in the `Authorization: Bearer <token>` header.

### Auth / Account
- `GET /me` — Current user account info
- `POST /me/onboarding-complete` — Mark onboarding done
- `GET /profile` — Current user's full profile
- `PUT /profile` — Update public profile
- `GET /preferences` — Get private preferences
- `PUT /preferences` — Save private preferences

### Discovery
- `GET /discover?limit=20` — Get eligible profiles (excludes blocked, matched, self)

### Interests
- `POST /interests?receiver_uid=...` — Send interest
- `POST /interests/{id}/respond?status=accepted|rejected` — Respond

### Matches
- `GET /matches` — Get all matches

### Conversations
- `GET /conversations` — List conversations
- `POST /conversations?other_uid=...` — Create/get conversation
- `GET /conversations/{id}/messages?limit=50` — Get messages
- `POST /conversations/{id}/messages?content=...` — Send message

### Favorites
- `GET /favorites` — List favorites
- `POST /favorites/{profile_uid}` — Add favorite
- `DELETE /favorites/{profile_uid}` — Remove favorite

### Blocking
- `POST /blocks/{blocked_uid}` — Block user
- `DELETE /blocks/{blocked_uid}` — Unblock user

## Frontend Integration

### Auth Context

The `AuthProvider` wraps the entire app and provides:

```tsx
const { user, loading, emailVerified, signOut, resendVerification } = useAuth();
```

### Protected Routes

```tsx
<ProtectedRoute requireEmailVerified>
  <Dashboard />
</ProtectedRoute>
```

### Registration Flow

1. Client validates name, email, DOB (18+), password strength, terms
2. `createUserWithEmailAndPassword` creates Firebase Auth account
3. `updateProfile` sets display name
4. `sendEmailVerification` sends verification email
5. `createUserDocument` creates Firestore user record (UID = doc ID)
6. `createProfileDocument` creates empty profile
7. Redirect to `/auth/verify-email`

### Login Flow

1. Client validates email/password format
2. `signInWithEmailAndPassword` authenticates
3. Firebase persists session automatically
4. Redirect to `/onboarding`

## Testing

### Manual Testing Checklist

- [ ] Registration with valid data → email verification sent
- [ ] Registration with underage DOB → rejected
- [ ] Registration with duplicate email → rejected
- [ ] Login with correct credentials → success
- [ ] Login with wrong password → error message
- [ ] Password reset → reset email sent
- [ ] Logout → session cleared
- [ ] Protected route access without auth → redirect to login
- [ ] Profile creation/edit → persists to Firestore
- [ ] Interest send/respond → creates match on mutual accept
- [ ] Messaging → only between matched users
- [ ] Blocking → blocks access to profile

### Backend Tests

```bash
cd services/api
pytest
```

### Firestore Rules Testing (Emulator)

```bash
# Start emulators
firebase emulators:start

# Run rules tests (add tests to firebase/tests/)
firebase emulators:exec "jest"
```

## Free-Tier (Spark) Considerations

- **Authentication**: Email/password is free
- **Firestore**: 50,000 reads/day, 20,000 writes/day, 1GB storage (free tier)
- **Storage**: NOT available on Spark — profile photos use abstraction, uploads disabled until Blaze or external storage
- **Cloud Functions**: NOT available on Spark — all backend logic is in FastAPI
- **Email verification**: Built into Firebase Auth, free

## Security Notes

1. **No private credentials in client code** — only public Firebase web config
2. **Service account keys are gitignored** — never committed
3. **Server-side authorization** — Firestore rules + backend checks
4. **ID token verification** — all backend routes verify Firebase tokens
5. **No plaintext passwords** — Firebase Auth handles password hashing
6. **PII protection** — profiles expose only approved public fields

## Troubleshooting

### "Firebase app named '[DEFAULT]' already exists"
The client module uses a singleton pattern (`getApps().length === 0`) to prevent this in dev mode.

### "Missing NEXT_PUBLIC_FIREBASE_* env vars"
Set up `.env.local` in `apps/web/` as described above.

### Backend "Invalid Firebase token"
Ensure the service account JSON is valid and `FIREBASE_SERVICE_ACCOUNT_PATH` points to it.

### Firestore permission denied
Check `firebase/firestore.rules` — ensure the operation is allowed for the user's role.
