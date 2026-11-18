"""
Firebase Admin SDK integration for FOUND backend.
Verifies Firebase ID tokens and provides authorized database operations.

Never expose service-account keys to the browser. Credentials are loaded
server-side from environment variables or a service account JSON file.
"""
import os
from typing import Optional, Dict, Any
import firebase_admin
from firebase_admin import credentials, auth, firestore
from functools import lru_cache


_firebase_app: Optional[firebase_admin.App] = None
_db = None


def get_firebase_app() -> firebase_admin.App:
    """Initialize and return the Firebase Admin app (singleton)."""
    global _firebase_app
    if _firebase_app is not None:
        return _firebase_app

    # Try service account JSON file first (production)
    sa_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT_PATH")
    if sa_path and os.path.exists(sa_path):
        cred = credentials.Certificate(sa_path)
        _firebase_app = firebase_admin.initialize_app(cred)
        return _firebase_app

    # Fall back to environment variables (works with GCP metadata server)
    project_id = os.environ.get("FIREBASE_PROJECT_ID", "found-d8728")
    if not firebase_admin._apps:
        _firebase_app = firebase_admin.initialize_app(
            credentials.ApplicationDefault(),
            options={"projectId": project_id},
        )
    return _firebase_app


def get_db() -> firestore.Client:
    """Return the Firestore client (singleton)."""
    global _db
    if _db is not None:
        return _db
    get_firebase_app()
    _db = firestore.client()
    return _db


async def verify_firebase_token(token: str) -> Dict[str, Any]:
    """
    Verify a Firebase ID token and return the decoded claims.
    Raises ValueError if the token is invalid.
    """
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception as e:
        raise ValueError(f"Invalid Firebase token: {str(e)}")


def get_user_uid_from_token(token: str) -> str:
    """Extract the user UID from a verified Firebase ID token."""
    decoded = asyncio_run_safe(verify_firebase_token, token)
    return decoded.get("uid", "")


def asyncio_run_safe(func, *args, **kwargs):
    """Run an async function safely in sync context."""
    import asyncio
    try:
        loop = asyncio.get_event_loop()
        if loop.is_running():
            # We're in an async context, use run_coroutine_threadsafe
            import concurrent.futures
            with concurrent.futures.ThreadPoolExecutor() as pool:
                return pool.submit(asyncio.run, func(*args, **kwargs)).result()
    except RuntimeError:
        pass
    return asyncio.run(func(*args, **kwargs))
