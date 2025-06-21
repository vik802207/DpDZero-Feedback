from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
from passlib.hash import bcrypt
from app.config import SUPABASE_URL, SUPABASE_API_KEY

router = APIRouter()

class ManagerSignup(BaseModel):
    name: str
    email: str
    password: str

class ManagerLogin(BaseModel):
    email: str
    password: str

@router.post("/signup")
async def signup_manager(data: ManagerSignup):
    # check if email already exists
    url = f"{SUPABASE_URL}/rest/v1/managers?email=eq.{data.email}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    if response.status_code == 200 and response.json():
        raise HTTPException(status_code=400, detail="Email already registered")

    # hash password
    hashed_pw = bcrypt.hash(data.password)

    insert_url = f"{SUPABASE_URL}/rest/v1/managers"
    insert_headers = {
        **headers,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

    payload = {
        "name": data.name,
        "email": data.email,
        "password": hashed_pw
    }

    async with httpx.AsyncClient() as client:
        insert_response = await client.post(insert_url, headers=insert_headers, json=payload)

    if insert_response.status_code not in [200, 201]:
        raise HTTPException(status_code=500, detail="Failed to create manager")

    return {"message": "Manager signup successful", "data": insert_response.json()}


@router.post("/login")
async def login_manager(data: ManagerLogin):
    url = f"{SUPABASE_URL}/rest/v1/managers?email=eq.{data.email}"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    if response.status_code != 200 or not response.json():
        raise HTTPException(status_code=400, detail="Manager not found")

    manager = response.json()[0]

    if not bcrypt.verify(data.password, manager["password"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {"message": "Login successful", "manager": manager}

@router.get("/team")
async def get_all_employees():
    url = f"{SUPABASE_URL}/rest/v1/employees"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)

    return response.json()
@router.get("/bulk")
async def get_bulk_managers(id: str):
    ids = id.split(",")
    url = f"{SUPABASE_URL}/rest/v1/manager?id=in.({','.join(ids)})"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
    return response.json()
