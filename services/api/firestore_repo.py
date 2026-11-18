"""
Firestore repository layer for FOUND.
Centralized data access with authorization checks enforced at the application layer.
Uses Firebase Admin SDK which bypasses Firestore security rules — so all
authorization must be validated here.
"""
from typing import Optional, Dict, Any, List
from datetime import datetime
from firebase_admin import firestore
from firebase_admin_client import get_db


def server_timestamp():
    return firestore.SERVER_TIMESTAMP


# ==========================================
# User account operations
# ==========================================

def get_user_account(uid: str) -> Optional[Dict[str, Any]]:
    """Fetch a user's private account document."""
    db = get_db()
    doc = db.collection("users").document(uid).get()
    if not doc.exists:
        return None
    return doc.to_dict()


def update_user_account(uid: str, data: Dict[str, Any]) -> bool:
    """
    Update a user's account document.
    Prevents modification of sensitive fields (isAdmin, accountStatus).
    """
    db = get_db()
    allowed_fields = {
        "displayName", "email", "emailVerified", "onboardingStatus", "updatedAt"
    }
    safe_data = {k: v for k, v in data.items() if k in allowed_fields}
    safe_data["updatedAt"] = server_timestamp()
    db.collection("users").document(uid).set(safe_data, merge=True)
    return True


# ==========================================
# Profile operations
# ==========================================

def get_public_profile(uid: str) -> Optional[Dict[str, Any]]:
    """Fetch a user's public profile (safe fields only)."""
    db = get_db()
    doc = db.collection("profiles").document(uid).get()
    if not doc.exists:
        return None
    data = doc.to_dict()
    # Only return safe public fields
    safe_fields = {
        "uid", "publicDisplayName", "age", "generalLocation",
        "education", "occupation", "biography", "interests", "visibility"
    }
    return {k: v for k, v in data.items() if k in safe_fields}


def get_full_profile(uid: str) -> Optional[Dict[str, Any]]:
    """Fetch a user's full profile (for owner or admin)."""
    db = get_db()
    doc = db.collection("profiles").document(uid).get()
    if not doc.exists:
        return None
    return doc.to_dict()


def create_or_update_profile(uid: str, data: Dict[str, Any]) -> bool:
    """Create or update a user's public profile."""
    db = get_db()
    profile_data = {
        "uid": uid,
        "updatedAt": server_timestamp(),
        **data,
    }
    db.collection("profiles").document(uid).set(profile_data, merge=True)
    return True


# ==========================================
# Preferences operations
# ==========================================

def get_preferences(uid: str) -> Optional[Dict[str, Any]]:
    """Fetch a user's private partner preferences."""
    db = get_db()
    doc = db.collection("preferences").document(uid).get()
    if not doc.exists:
        return None
    return doc.to_dict()


def save_preferences(uid: str, data: Dict[str, Any]) -> bool:
    """Save a user's private partner preferences."""
    db = get_db()
    pref_data = {
        "uid": uid,
        "updatedAt": server_timestamp(),
        **data,
    }
    db.collection("preferences").document(uid).set(pref_data, merge=True)
    return True


# ==========================================
# Interest operations
# ==========================================

def create_interest(sender_uid: str, receiver_uid: str) -> Optional[str]:
    """Create an interest request. Returns interest ID or None if duplicate."""
    db = get_db()
    # Check for existing interest
    existing = (
        db.collection("interests")
        .where("senderUid", "==", sender_uid)
        .where("receiverUid", "==", receiver_uid)
        .limit(1)
        .get()
    )
    if existing:
        return None

    interest_data = {
        "senderUid": sender_uid,
        "receiverUid": receiver_uid,
        "status": "pending",
        "createdAt": server_timestamp(),
        "updatedAt": server_timestamp(),
    }
    doc = db.collection("interests").add(interest_data)
    return doc[1].id


def respond_to_interest(interest_id: str, receiver_uid: str, status: str) -> bool:
    """Accept or reject an interest (receiver only)."""
    if status not in ["accepted", "rejected"]:
        return False
    db = get_db()
    interest_ref = db.collection("interests").document(interest_id)
    interest = interest_ref.get()
    if not interest.exists:
        return False
    data = interest.to_dict()
    if data.get("receiverUid") != receiver_uid:
        return False
    interest_ref.update({
        "status": status,
        "updatedAt": server_timestamp(),
    })
    # If accepted, create a mutual match
    if status == "accepted":
        _create_match_if_mutual(data["senderUid"], receiver_uid)
    return True


def _create_match_if_mutual(uid1: str, uid2: str) -> None:
    """Create a match if both users have accepted each other."""
    db = get_db()
    # Check if reverse interest exists and is accepted
    reverse = (
        db.collection("interests")
        .where("senderUid", "==", uid2)
        .where("receiverUid", "==", uid1)
        .where("status", "==", "accepted")
        .limit(1)
        .get()
    )
    if reverse:
        # Mutual match exists — create match document
        match_data = {
            "participantOne": min(uid1, uid2),
            "participantTwo": max(uid1, uid2),
            "accepted": True,
            "matchedAt": server_timestamp(),
        }
        db.collection("matches").add(match_data)


# ==========================================
# Match operations
# ==========================================

def get_user_matches(uid: str) -> List[Dict[str, Any]]:
    """Get all matches for a user."""
    db = get_db()
    matches = (
        db.collection("matches")
        .where("participantOne", "==", uid)
        .where("accepted", "==", True)
        .get()
    ) + (
        db.collection("matches")
        .where("participantTwo", "==", uid)
        .where("accepted", "==", True)
        .get()
    )
    result = []
    for m in matches:
        data = m.to_dict()
        data["id"] = m.id
        result.append(data)
    return result


# ==========================================
# Eligible profiles for discovery
# ==========================================

def get_eligible_profiles(
    current_uid: str,
    limit: int = 20,
    cursor: Optional[Dict[str, Any]] = None,
) -> List[Dict[str, Any]]:
    """
    Fetch eligible profiles for discovery.
    Excludes: blocked accounts, suspended/hidden profiles, self,
    already-interested, already-matched.
    """
    db = get_db()

    # Get blocked UIDs
    blocked = (
        db.collection("blocks").document(current_uid).collection("users").get()
    )
    blocked_uids = {b.to_dict().get("blockedUser") for b in blocked if b.to_dict().get("blockedUser")}

    # Get UIDs the current user has already interacted with
    interests = (
        db.collection("interests")
        .where("senderUid", "==", current_uid)
        .get()
    )
    interested_uids = {i.to_dict().get("receiverUid") for i in interests}

    matches = get_user_matches(current_uid)
    matched_uids = set()
    for m in matches:
        matched_uids.add(m.get("participantOne"))
        matched_uids.add(m.get("participantTwo"))

    exclude = blocked_uids | interested_uids | matched_uids | {current_uid}

    # Query public profiles with visibility == 'public' and account active
    query = (
        db.collection("profiles")
        .where("visibility", "==", "public")
        .order_by("updatedAt", direction=firestore.Query.DESCENDING)
        .limit(limit)
    )

    if cursor:
        query = query.start_after(cursor)

    profiles = query.get()
    result = []
    for p in profiles:
        data = p.to_dict()
        uid = data.get("uid")
        if uid and uid not in exclude:
            # Verify account is active
            account = get_user_account(uid)
            if account and account.get("accountStatus") in ["active", "hidden"]:
                # Remove internal fields
                safe = {
                    "id": p.id,
                    "uid": uid,
                    "publicDisplayName": data.get("publicDisplayName"),
                    "age": data.get("age"),
                    "generalLocation": data.get("generalLocation"),
                    "education": data.get("education"),
                    "occupation": data.get("occupation"),
                    "biography": data.get("biography"),
                    "interests": data.get("interests", []),
                }
                result.append(safe)

    return result


# ==========================================
# Messaging operations
# ==========================================

def get_or_create_conversation(uid1: str, uid2: str, match_id: str) -> str:
    """Get existing conversation or create a new one for two participants."""
    db = get_db()
    # Find existing conversation
    existing = (
        db.collection("conversations")
        .where("participantOne", "==", min(uid1, uid2))
        .where("participantTwo", "==", max(uid1, uid2))
        .limit(1)
        .get()
    )
    if existing:
        return existing[0].id

    conv_data = {
        "participantOne": min(uid1, uid2),
        "participantTwo": max(uid1, uid2),
        "matchId": match_id,
        "createdAt": server_timestamp(),
        "lastMessageAt": server_timestamp(),
    }
    doc = db.collection("conversations").add(conv_data)
    return doc[1].id


def send_message(conversation_id: str, sender_uid: str, content: str) -> Optional[str]:
    """Send a message if sender is a conversation participant. Returns message ID."""
    db = get_db()
    conv = db.collection("conversations").document(conversation_id).get()
    if not conv.exists:
        return None
    data = conv.to_dict()
    if sender_uid not in [data.get("participantOne"), data.get("participantTwo")]:
        return None

    msg_data = {
        "senderUid": sender_uid,
        "content": content,
        "createdAt": server_timestamp(),
    }
    doc = db.collection("conversations").document(conversation_id).collection("messages").add(msg_data)

    # Update last message timestamp
    db.collection("conversations").document(conversation_id).update({
        "lastMessageAt": server_timestamp(),
    })
    return doc[1].id


def get_conversation_messages(conversation_id: str, user_uid: str, limit: int = 50) -> List[Dict[str, Any]]:
    """Get messages for a conversation if user is a participant."""
    db = get_db()
    conv = db.collection("conversations").document(conversation_id).get()
    if not conv.exists:
        return []
    data = conv.to_dict()
    if user_uid not in [data.get("participantOne"), data.get("participantTwo")]:
        return []

    messages = (
        db.collection("conversations")
        .document(conversation_id)
        .collection("messages")
        .order_by("createdAt", direction=firestore.Query.ASCENDING)
        .limit(limit)
        .get()
    )
    result = []
    for m in messages:
        d = m.to_dict()
        d["id"] = m.id
        result.append(d)
    return result


# ==========================================
# Favorites operations
# ==========================================

def add_favorite(uid: str, profile_uid: str) -> bool:
    """Add a profile to user's favorites."""
    db = get_db()
    db.collection("favorites").document(uid).collection("items").document(profile_uid).set({
        "favoritedBy": uid,
        "favoritedProfile": profile_uid,
        "createdAt": server_timestamp(),
    })
    return True


def remove_favorite(uid: str, profile_uid: str) -> bool:
    """Remove a profile from user's favorites."""
    db = get_db()
    db.collection("favorites").document(uid).collection("items").document(profile_uid).delete()
    return True


def get_favorites(uid: str) -> List[Dict[str, Any]]:
    """Get user's favorited profiles."""
    db = get_db()
    items = db.collection("favorites").document(uid).collection("items").get()
    result = []
    for item in items:
        data = item.to_dict()
        data["id"] = item.id
        result.append(data)
    return result


# ==========================================
# Blocking operations
# ==========================================

def block_user(uid: str, blocked_uid: str) -> bool:
    """Block another user."""
    db = get_db()
    db.collection("blocks").document(uid).collection("users").document(blocked_uid).set({
        "blockedBy": uid,
        "blockedUser": blocked_uid,
        "blockedAt": server_timestamp(),
    })
    return True


def unblock_user(uid: str, blocked_uid: str) -> bool:
    """Unblock a user."""
    db = get_db()
    db.collection("blocks").document(uid).collection("users").document(blocked_uid).delete()
    return True


def is_blocked(uid: str, other_uid: str) -> bool:
    """Check if uid has blocked other_uid."""
    db = get_db()
    doc = db.collection("blocks").document(uid).collection("users").document(other_uid).get()
    return doc.exists
