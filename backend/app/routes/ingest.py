from fastapi import APIRouter, UploadFile, File
from typing import List
from app.controllers import ingest_controller

router = APIRouter(tags=["Ingest"])

@router.post("/ingest")
async def ingest_files(files: List[UploadFile] = File(...)):
    return await ingest_controller.ingest_files(files)

@router.delete("/ingest")
async def delete_all_files():
    return await ingest_controller.delete_all_files()
