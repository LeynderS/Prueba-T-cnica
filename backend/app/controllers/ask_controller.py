from fastapi import HTTPException
from typing import Dict
from app.services import ask_service

async def ask(question: str) -> Dict:
    try:
        return ask_service.answer_question(question)
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Error procesando la pregunta")
