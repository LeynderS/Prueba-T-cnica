# 🧠 Mini Asistente de Q&A – Prueba Técnica

¡Hola! 👋  
Gracias por tu interés en unirte a nuestro equipo. Esta prueba técnica tiene como objetivo evaluar tu capacidad para construir una aplicación funcional de principio a fin, enfocándonos en la calidad de tu código, tu enfoque a la resolución de problemas y la experiencia de usuario.

---

## 🚀 El Reto

Desarrolla una micro-aplicación web que permita a los usuarios:

- Subir archivos `.txt` o `.pdf` (entre 3 y 10).
- Buscar contenido relevante dentro de los documentos.
- Hacer preguntas en lenguaje natural y recibir una respuesta breve con citas de los documentos.

---

## ⏱️ Tiempo Estimado

6 a 8 horas.  
No buscamos perfección, sino una solución funcional, clara y con buenas prácticas. Sé honesto con el tiempo que invertiste (agradecemos la transparencia).

---

## ✅ Alcances Mínimos

### A. Backend (FastAPI o Node.js/Express)

Debe exponer los siguientes endpoints:

- **POST `/ingest`**:  
  Recibe múltiples archivos, los procesa y los indexa (en memoria o disco).

- **GET `/search?q=...`**:  
  Devuelve los pasajes más relevantes con:
  - Texto del fragmento
  - Nombre del documento
  - Puntaje de relevancia

- **POST `/ask`**:  
  Recibe `{ "question": "string" }` y responde en 3–4 líneas, con 1–3 citas de respaldo.

#### Motor de búsqueda y respuesta (elige una opción)

- **Opción 1 – Clásica (sin LLM):**
  - Indexa documentos dividiéndolos en fragmentos.
  - Usa TF-IDF o BM25 para búsqueda.
  - Devuelve frases extraídas como respuesta con su cita.

- **Opción 2 – Con LLM:**
  - Recupera los pasajes más relevantes.
  - Genera la respuesta con un LLM (OpenAI, Gemini, etc.) usando un prompt con contexto.
  - La respuesta debe:
    - Citar correctamente las fuentes.
    - Decir "No encuentro esa información en los documentos cargados" si no tiene contexto suficiente.

---

### B. Frontend (React + TypeScript)

La interfaz debe ser simple, funcional y clara. No es necesario usar librerías de componentes.

**Componentes esperados:**

- **Uploader:**  
  Zona de drag & drop para subir documentos. Muestra los archivos indexados.

- **Buscador:**  
  Campo para consultas simples. Muestra los pasajes encontrados y su fuente.

- **Q&A:**  
  Campo para preguntas en lenguaje natural. Muestra respuesta y citas asociadas.

**Estados:**  
La UI debe reflejar claramente estados de carga, errores y resultados vacíos.

---

### C. Despliegue y Entrega

Todo el sistema debe levantarse con:

```bash
docker-compose up
```

**Entrega:**

- Repositorio público en GitHub/GitLab.
- Archivo `README.md` con:
  - Instrucciones de ejecución.
  - Decisiones técnicas y supuestos.
  - Tiempo real invertido.
  - Capturas de pantalla o un GIF corto (máx. 30s) mostrando la app.

---

## ⭐ Alcances Deseables (Bonus)

¿Te sobra tiempo? Estos extras suman puntos:

- Citas clicables que resaltan el texto original.
- Persistencia del índice en `.json`, `.pkl`, etc.
- Rate limiting o validaciones más robustas de archivos.
- Pruebas unitarias extra en backend y frontend.

---

## 🗂️ Dataset de Prueba

En la carpeta `sample_docs/` encontrarás archivos de texto con los que puedes probar la aplicación.  
Tu solución debe funcionar tanto con esos como con cualquier `.txt` o `.md`.

---

## 💯 Criterios de Evaluación

| Categoría         | Puntos | Detalle                                        |
|-------------------|--------|------------------------------------------------|
| Funcionalidad     | 40 pts | `/ingest`, `/search`, `/ask`, manejo de errores|
| Calidad Técnica   | 30 pts | Estructura, limpieza, lógica, pruebas mínimas  |
| Frontend & UX     | 20 pts | Flujo claro, feedback visual, citas            |
| DevOps & Entrega  | 10 pts | Docker, documentación, demo                    |
| **TOTAL**         | 100 pts| Aprobado: ≥70, Prioridad: ≥85 + bonus          |

---

## 📬 Entrega

- Sube tu código a un repo público (GitHub/GitLab).
- Asegúrate de que `README.md` esté completo.
- Comparte con nosotros el enlace al repo.

---

## 🎯 Recomendaciones Finales

- Mantén tu solución simple y funcional.
- Prioriza la claridad sobre la complejidad innecesaria.
- Si algo no funciona, explícalo en el README: ¡la comunicación importa!

---

¡Mucha suerte! Estamos deseando ver lo que puedes construir
