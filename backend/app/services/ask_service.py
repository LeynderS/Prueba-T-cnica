from typing import List, Dict
from app.services.search_service import search_documents

def answer_question(question: str) -> Dict:
    results = search_documents(question, 3)
    
    if not results:
        return {"question": question, "answer": "No se encontró información relevante.", "citations": []}

    # Tomar los textos más relevantes
    top_texts = [r["text"] for r in results]
    top_sources = [{"document": r["document"], "score": r["score"]} for r in results]

    # Crear una respuesta resumida (3-4 líneas aprox.)
    summary = " ".join(top_texts)  # aquí podrías usar alguna librería de resumen si quieres
    summary = " ".join(summary.split()[:80]) + "..."  # ejemplo: limitar a ~80 palabras

    return {
        "question": question,
        "answer": summary,
        "citations": top_sources
    }
