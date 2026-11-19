# FOUND — Agent Development Policy

This document defines the mandatory development workflow for all FOUND implementations.

## Required Workflow: Implement → Test → Fix → Retest → Full Regression → Final Verification

Every change to FOUND code, Firestore rules, or security policies **must** follow this cycle:

1. **Implement** — Make the minimal change needed to address the requirement.
2. **Test** — Run the relevant automated tests immediately after the change.
3. **Fix** — Investigate failures at the root cause; never guess or patch blindly.
4. **Retest** — Re-run the relevant tests to confirm the fix works.
5. **Full regression** — Run the entire test suite to confirm no previously-passing tests broke.
6. **Final verification** — Confirm TypeScript compilation, security tests, backend tests (where applicable), and that no tests are skipped or disabled.

## Reporting Standards

- **Never report an implementation as "verified" without execution evidence.**
- If a test environment is unavailable (e.g., Java/Firebase emulator not installable in the sandbox), state the blocker explicitly and mark results as **"Awaiting local verification"**.
- Do not fabricate successful test results. Distinguish clearly between **executed** results and **expected** results.
- Never delete, skip, or weaken tests merely to force a passing result.
- Never weaken security rules merely to make a test pass.

## Security Requirements

- Preserve deny-by-default authorization.
- Prevent unauthorized reads/writes to private data (users, preferences, matches, conversations).
- Prevent role escalation (`isAdmin`, `accountStatus`, `isVerified` fields protected).
- Require verified mutual consent for matches and messaging.
- Prevent message impersonation and unauthorized message modification/deletion.
- Validate field-level diff constraints using supported rules syntax (`hasAll`, `!hasAny`, `size` — **not** `.only()` or `hasNone()`).
- Guard document-existence checks with `exists(path)` — never rely on `get().exists`.

## Valid Firestore Rules Syntax Notes

- Use `exists(path)` for document existence checks. Do not use `get(path).exists` (throws in some emulator versions).
- Use `affectedKeys().hasAll([...])` and `!affectedKeys().hasAny([...])` / `affectedKeys().size()` for field-diff constraints. The methods `.only([...])` and `hasNone([...])` are **not** valid rules syntax.

## Test Execution Commands

Firebase security tests (requires Java 21):
```bash
firebase emulators:exec --only firestore,auth --project found-d8728 "npm test --prefix firebase"
```

TypeScript type check:
```bash
cd firebase && npx tsc --noEmit
```
