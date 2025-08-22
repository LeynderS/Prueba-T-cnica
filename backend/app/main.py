from fastapi import FastAPI
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

app = FastAPI()

@app.get("/")
def read_env():
    backend_port = os.getenv("BACKEND_PORT", "8000")
    env = os.getenv("ENV", "development")
    return {"BACKEND_PORT": backend_port, "ENV": env}