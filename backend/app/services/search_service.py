from typing import List, Dict
from fastapi import HTTPException
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.ingest_service import DOCUMENT_INDEX
from unidecode import unidecode

def search_documents(query: str, top_n: int = 3) -> List[Dict]:
    if not DOCUMENT_INDEX:
      raise HTTPException(status_code=400, detail="No hay archivos indexados. Por favor, suba documentos primero.")

    # Utilizar unidecode para normalizar texto
    texts = [unidecode(doc["text"].lower()) for doc in DOCUMENT_INDEX]
    documents = [doc["document"] for doc in DOCUMENT_INDEX]

    # Vectorizar los fragmentos y la consulta
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(texts)
    query_vec = vectorizer.transform([unidecode(query.lower())])

    # Calcular similitud coseno
    cosine_sim = cosine_similarity(query_vec, tfidf_matrix).flatten()

    # Obtener índices de los top N (3) fragmentos
    top_indices = cosine_sim.argsort()[::-1][:top_n]

    # Preparar resultados
    results = []
    for idx in top_indices:
        if cosine_sim[idx] > 0.05:
            results.append({
                "document": documents[idx],
                "text": texts[idx],
                "score": float(cosine_sim[idx])
            })

    return results
