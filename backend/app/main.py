from fastapi import FastAPI
from app.routes import ingest

app = FastAPI(title="QA Assistant Backend")

app.include_router(ingest.router)
