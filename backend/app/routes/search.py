from fastapi import APIRouter, Query
from app.controllers.search_controller import search_controller as search

router = APIRouter(tags=["Search"])

@router.get("/search")
async def search_endpoint(q: str = Query(..., description="Consulta en lenguaje natural")):
    return await search(q)
