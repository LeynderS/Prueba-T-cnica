from fastapi import APIRouter
from app.controllers import ask_controller
from pydantic import BaseModel

router = APIRouter()

class AskRequest(BaseModel):
    question: str

@router.post("/ask")
async def ask_endpoint(payload: AskRequest):
    return await ask_controller.ask(payload.question)
