"""
FastAPI dependency for Firebase ID token verification.
Replaces the old JWT-based get_current_user with Firebase token verification.
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin_client import verify_firebase_token, get_db
from firestore_repo import get_user_account, is_account_active

security = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    """
    Verify a Firebase ID token and return the user's Firestore account data.
    Raises 401 if token is invalid or user account is not active.
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        decoded = await verify_firebase_token(credentials.credentials)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    uid = decoded.get("uid")
    if not uid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    account = get_user_account(uid)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found",
        )

    if account.get("accountStatus") not in ["active", "hidden"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is not active",
        )

    return {
        "uid": uid,
        "email": account.get("email"),
        "displayName": account.get("displayName"),
        "emailVerified": account.get("emailVerified", False),
        "onboardingStatus": account.get("onboardingStatus", "incomplete"),
        "isAdmin": account.get("isAdmin", False),
    }


async def get_current_admin(
    current_user: dict = Depends(get_current_user),
) -> dict:
    """Require admin role (set server-side via custom claims or Firestore)."""
    if not current_user.get("isAdmin"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


async def get_optional_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict | None:
    """Return user data if token is valid, None otherwise (for public endpoints)."""
    if credentials is None:
        return None
    try:
        decoded = await verify_firebase_token(credentials.credentials)
        uid = decoded.get("uid")
        if not uid:
            return None
        account = get_user_account(uid)
        if not account:
            return None
        return {
            "uid": uid,
            "email": account.get("email"),
            "displayName": account.get("displayName"),
            "emailVerified": account.get("emailVerified", False),
            "isAdmin": account.get("isAdmin", False),
        }
    except ValueError:
        return None
