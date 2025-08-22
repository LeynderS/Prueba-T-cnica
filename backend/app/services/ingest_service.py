from fastapi import HTTPException, UploadFile
from typing import List, Dict
import fitz  # PyMuPDF para manejar PDFs
import os

# Estructura global temporal en memoria
DOCUMENT_INDEX = []

async def process_files(files: List[UploadFile]) -> List[Dict]:
    global DOCUMENT_INDEX
    DOCUMENT_INDEX.clear()

    for file in files:
        filename = file.filename
        extension = os.path.splitext(filename)[1].lower()

        if extension not in [".txt", ".pdf"]:
          raise HTTPException(
              status_code=400,
              detail=f"Formato de archivo no soportado: {extension}"
          )

        fragments = []
        
        if extension == ".txt":
            content = (await file.read()).decode("utf-8")
            fragments = [frag.strip() for frag in content.split("\n") if frag.strip()]

        elif extension == ".pdf":
            pdf_bytes = await file.read()
            doc = fitz.open(stream=pdf_bytes, filetype="pdf")
            
            for page in doc:
                blocks = page.get_text("blocks")  # Obtener bloques de texto
                for b in blocks:
                    # Extraer texto del bloque
                    text = b[4].replace("\n", " ").strip()
                    if text:
                        fragments.append(text)

        for frag in fragments:
            DOCUMENT_INDEX.append({
                "document": filename,
                "text": frag
            })

    return DOCUMENT_INDEX
