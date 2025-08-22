from fastapi import UploadFile, HTTPException
from typing import List
from app.services import ingest_service

async def ingest_files(files: List[UploadFile]):
    try:
        indexed_docs = await ingest_service.process_files(files)
        return {"message": "Files ingested successfully", "documents": indexed_docs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
