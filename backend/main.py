from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from    app.routes import feedback
from    app.routes import employee
from  app.routes import manager
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods: GET, POST, PUT, etc.
    allow_headers=["*"],  # Allow all headers like Content-Type
)
app.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
app.include_router(manager.router,prefix="/manager",tags=["manager"])
app.include_router(employee.router,prefix="/employee", tags=["employee"])
@app.get("/")
def root():
    return {"message": "Feedback System Backend is Running"}
