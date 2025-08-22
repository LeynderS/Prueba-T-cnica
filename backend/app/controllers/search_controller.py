from fastapi import HTTPException
from typing import Dict
from app.services import search_service

async def search_controller(q: str) -> Dict:
    if not q.strip():
        raise HTTPException(status_code=400, detail="La consulta no puede estar vacía.")

    results = search_service.search_documents(q)
    return {"query": q, "results": results}
