"""
Firebase-authenticated API routes for FOUND.
All routes verify Firebase ID tokens server-side.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from typing import Optional, List
from firebase_deps import get_current_user, get_current_admin, get_optional_user
from firestore_repo import (
    get_user_account,
    update_user_account,
    get_public_profile,
    get_full_profile,
    create_or_update_profile,
    get_preferences,
    save_preferences,
    create_interest,
    respond_to_interest,
    get_user_matches,
    get_eligible_profiles,
    get_or_create_conversation,
    send_message,
    get_conversation_messages,
    add_favorite,
    remove_favorite,
    get_favorites,
    block_user,
    unblock_user,
    is_blocked,
)

router = APIRouter(prefix="/api/v1", tags=["firebase"])


# ==========================================
# Auth / Account
# ==========================================

class ProfileUpdateRequest(BaseModel):
    publicDisplayName: Optional[str] = Field(None, min_length=2, max_length=100)
    generalLocation: Optional[str] = None
    education: Optional[str] = None
    occupation: Optional[str] = None
    biography: Optional[str] = None
    interests: Optional[List[str]] = None
    visibility: Optional[str] = None


class PreferencesUpdateRequest(BaseModel):
    preferredAgeMin: Optional[int] = None
    preferredAgeMax: Optional[int] = None
    locationPreference: Optional[str] = None
    lifestyle: Optional[str] = None
    marriageTimeline: Optional[str] = None
    familyExpectations: Optional[str] = None
    culturalPreferences: Optional[str] = None
    relationshipValues: Optional[str] = None


@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """Get current user's account info."""
    account = get_user_account(user["uid"])
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return {
        "uid": user["uid"],
        "email": account.get("email"),
        "displayName": account.get("displayName"),
        "emailVerified": account.get("emailVerified", False),
        "onboardingStatus": account.get("onboardingStatus", "incomplete"),
        "accountStatus": account.get("accountStatus", "active"),
        "createdAt": account.get("createdAt"),
    }


@router.post("/me/onboarding-complete")
async def complete_onboarding(user: dict = Depends(get_current_user)):
    """Mark user's onboarding as complete."""
    update_user_account(user["uid"], {"onboardingStatus": "complete"})
    return {"message": "Onboarding completed", "success": True}


@router.get("/profile")
async def get_my_profile(user: dict = Depends(get_current_user)):
    """Get current user's full profile."""
    profile = get_full_profile(user["uid"])
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/profile")
async def update_my_profile(
    req: ProfileUpdateRequest,
    user: dict = Depends(get_current_user),
):
    """Update current user's public profile."""
    data = req.model_dump(exclude_none=True)
    create_or_update_profile(user["uid"], data)
    return {"message": "Profile updated", "success": True}


@router.get("/preferences")
async def get_my_preferences(user: dict = Depends(get_current_user)):
    """Get current user's private preferences."""
    prefs = get_preferences(user["uid"])
    if not prefs:
        return {}
    return prefs


@router.put("/preferences")
async def update_my_preferences(
    req: PreferencesUpdateRequest,
    user: dict = Depends(get_current_user),
):
    """Save current user's private preferences."""
    data = req.model_dump(exclude_none=True)
    save_preferences(user["uid"], data)
    return {"message": "Preferences saved", "success": True}


# ==========================================
# Discovery / Matchmaking
# ==========================================

@router.get("/discover")
async def discover_profiles(
    limit: int = 20,
    user: Optional[dict] = Depends(get_optional_user),
):
    """Get eligible profiles for discovery. Requires authentication."""
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    profiles = get_eligible_profiles(user["uid"], limit=limit)
    return {"profiles": profiles, "count": len(profiles)}


# ==========================================
# Interests
# ==========================================

@router.post("/interests")
async def send_interest(
    receiver_uid: str,
    user: dict = Depends(get_current_user),
):
    """Send an interest request to another user."""
    if receiver_uid == user["uid"]:
        raise HTTPException(status_code=400, detail="Cannot send interest to yourself")
    interest_id = create_interest(user["uid"], receiver_uid)
    if not interest_id:
        raise HTTPException(status_code=409, detail="Interest already sent")
    return {"interestId": interest_id, "message": "Interest sent", "success": True}


@router.post("/interests/{interest_id}/respond")
async def respond_interest(
    interest_id: str,
    status: str,
    user: dict = Depends(get_current_user),
):
    """Accept or reject an interest."""
    ok = respond_to_interest(interest_id, user["uid"], status)
    if not ok:
        raise HTTPException(status_code=404, detail="Interest not found or not yours")
    return {"message": f"Interest {status}", "success": True}


# ==========================================
# Matches
# ==========================================

@router.get("/matches")
async def get_my_matches(user: dict = Depends(get_current_user)):
    """Get all matches for the current user."""
    matches = get_user_matches(user["uid"])
    return {"matches": matches, "count": len(matches)}


# ==========================================
# Conversations / Messaging
# ==========================================

@router.get("/conversations")
async def get_my_conversations(user: dict = Depends(get_current_user)):
    """Get all conversations for the current user."""
    db = __import__("firebase_admin_client", fromlist=["get_db"]).get_db()
    convs = (
        db.collection("conversations")
        .where("participantOne", "==", user["uid"])
        .get()
    ) + (
        db.collection("conversations")
        .where("participantTwo", "==", user["uid"])
        .get()
    )
    result = []
    for c in convs:
        data = c.to_dict()
        data["id"] = c.id
        result.append(data)
    return {"conversations": result, "count": len(result)}


@router.post("/conversations")
async def create_conversation(
    other_uid: str,
    match_id: Optional[str] = None,
    user: dict = Depends(get_current_user),
):
    """Create or get a conversation with another user."""
    conv_id = get_or_create_conversation(user["uid"], other_uid, match_id or "")
    return {"conversationId": conv_id, "success": True}


@router.get("/conversations/{conversation_id}/messages")
async def get_messages(
    conversation_id: str,
    limit: int = 50,
    user: dict = Depends(get_current_user),
):
    """Get messages in a conversation."""
    messages = get_conversation_messages(conversation_id, user["uid"], limit)
    return {"messages": messages, "count": len(messages)}


@router.post("/conversations/{conversation_id}/messages")
async def post_message(
    conversation_id: str,
    content: str,
    user: dict = Depends(get_current_user),
):
    """Send a message in a conversation."""
    if not content.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    msg_id = send_message(conversation_id, user["uid"], content)
    if not msg_id:
        raise HTTPException(status_code=403, detail="Not a participant in this conversation")
    return {"messageId": msg_id, "success": True}


# ==========================================
# Favorites
# ==========================================

@router.get("/favorites")
async def get_my_favorites(user: dict = Depends(get_current_user)):
    """Get favorited profiles."""
    items = get_favorites(user["uid"])
    return {"favorites": items, "count": len(items)}


@router.post("/favorites/{profile_uid}")
async def favorite_profile(
    profile_uid: str,
    user: dict = Depends(get_current_user),
):
    """Add a profile to favorites."""
    add_favorite(user["uid"], profile_uid)
    return {"message": "Added to favorites", "success": True}


@router.delete("/favorites/{profile_uid}")
async def unfavorite_profile(
    profile_uid: str,
    user: dict = Depends(get_current_user),
):
    """Remove a profile from favorites."""
    remove_favorite(user["uid"], profile_uid)
    return {"message": "Removed from favorites", "success": True}


# ==========================================
# Blocking
# ==========================================

@router.post("/blocks/{blocked_uid}")
async def block(
    blocked_uid: str,
    user: dict = Depends(get_current_user),
):
    """Block another user."""
    if blocked_uid == user["uid"]:
        raise HTTPException(status_code=400, detail="Cannot block yourself")
    block_user(user["uid"], blocked_uid)
    return {"message": "User blocked", "success": True}


@router.delete("/blocks/{blocked_uid}")
async def unblock(
    blocked_uid: str,
    user: dict = Depends(get_current_user),
):
    """Unblock a user."""
    unblock_user(user["uid"], blocked_uid)
    return {"message": "User unblocked", "success": True}
