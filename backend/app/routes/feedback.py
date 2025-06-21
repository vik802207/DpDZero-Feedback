from fastapi import APIRouter
from pydantic import BaseModel
import httpx
from app.config import SUPABASE_URL, SUPABASE_API_KEY

router = APIRouter()

# Request body model
class FeedbackCreate(BaseModel):
    from_manager: str
    to_employee: str
    strengths: str
    improvement: str
    sentiment: str  # positive / neutral / negative

@router.get("/")
async def get_feedbacks():
    url = f"{SUPABASE_URL}/rest/v1/feedback"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    return response.json()

@router.patch("/{feedback_id}/acknowledge")
async def acknowledge_feedback(feedback_id: str):
    url = f"{SUPABASE_URL}/rest/v1/feedback?id=eq.{feedback_id}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "acknowledge": True
    }

    async with httpx.AsyncClient() as client:
        response = await client.patch(url, headers=headers, json=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to acknowledge feedback") # type: ignore

    return {"message": "Feedback acknowledged", "data": response.json()}

@router.post("/")
async def create_feedback(data: FeedbackCreate):
    url = f"{SUPABASE_URL}/rest/v1/feedback"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "from_manager": data.from_manager,
        "to_employee": data.to_employee,
        "strengths": data.strengths,
        "improvements": data.improvement,
        "sentiment": data.sentiment
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload, headers=headers)

    return response.json()
@router.patch("/{feedback_id}")
async def update_feedback(feedback_id: str, data: FeedbackCreate):
    url = f"{SUPABASE_URL}/rest/v1/feedback?id=eq.{feedback_id}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "from_manager": data.from_manager,
        "to_employee": data.to_employee,
        "strengths": data.strengths,
        "improvements": data.improvement,
        "sentiment": data.sentiment
    }

    async with httpx.AsyncClient() as client:
        response = await client.patch(url, headers=headers, json=payload)

    if response.status_code not in [200, 204]:
        raise HTTPException(status_code=500, detail="Failed to update feedback")

    return response.json()