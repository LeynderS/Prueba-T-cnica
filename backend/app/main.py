from fastapi import FastAPI
from app.routes import ingest, search, ask

app = FastAPI(title="QA Assistant Backend")

app.include_router(ingest.router)
app.include_router(search.router)
app.include_router(ask.router)
