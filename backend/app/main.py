from fastapi import FastAPI
from app.routes import ingest, search

app = FastAPI(title="QA Assistant Backend")

app.include_router(ingest.router)
app.include_router(search.router)