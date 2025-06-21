from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from app.config import SUPABASE_URL, SUPABASE_API_KEY

router = APIRouter()

# Signup schema
class EmployeeSignup(BaseModel):
    name: str
    email: str
    password: str  # Plaintext just for MVP (not secure)

# Login schema
class EmployeeLogin(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup_employee(data: EmployeeSignup):
    url = f"{SUPABASE_URL}/rest/v1/employees"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "name": data.name,
        "email": data.email,
        "password": data.password
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)

    if response.status_code >= 400:
        raise HTTPException(status_code=400, detail="Signup failed")

    return {"message": "Employee signed up successfully", "employee": response.json()}

@router.post("/login")
async def login_employee(data: EmployeeLogin):
    url = f"{SUPABASE_URL}/rest/v1/employees?email=eq.{data.email}&select=*"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    employees = response.json()

    if not employees:
        raise HTTPException(status_code=404, detail="Employee not found")

    emp = employees[0]

    if emp["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful", "employee": emp}

@router.get("/feedbacks/{employee_id}")
async def get_feedbacks(employee_id: str):
    url = f"{SUPABASE_URL}/rest/v1/feedback?to_employee=eq.{employee_id}&select=*"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    return response.json()

@router.patch("/feedbacks/{feedback_id}/ack")
async def acknowledge(feedback_id: str):
    url = f"{SUPABASE_URL}/rest/v1/feedback?id=eq.{feedback_id}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "acknowledged": True
    }

    async with httpx.AsyncClient() as client:
        response = await client.patch(url, json=payload, headers=headers)

    return {"message": "Acknowledged", "data": response.json()}


