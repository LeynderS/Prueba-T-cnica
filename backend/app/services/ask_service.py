from typing import Dict
from app.services.search_service import search_documents

def answer_question(question: str) -> Dict:
    results = search_documents(question, 3)
    
    if not results:
        return {"question": question, "answer": "No se encontró información relevante.", "citations": []}

    # Tomar los textos más relevantes
    top_texts = " ".join([r["text"] for r in results])
    
    # Tokenización simple por puntos
    sentences = top_texts.split(". ")
    answer_text = ". ".join(sentences[:4])  # tomar solo las primeras 3-4 oraciones
    if not answer_text.endswith("."):
        answer_text += "."

    # Preparar citas únicas por documento
    citations = []
    seen_docs = set()
    for r in results:
        if r["document"] not in seen_docs:
            citations.append({"document": r["document"]})
            seen_docs.add(r["document"])
            
    return {
        "question": question,
        "answer": answer_text,
        "citations": citations
    }
