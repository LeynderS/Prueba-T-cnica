# 🧠 Mini Asistente Q&A – Prueba Técnica

Este proyecto es una aplicación web de asistente Q&A full stack que permite a los usuarios subir documentos (.txt o .pdf), buscar contenido relevante y hacer preguntas en lenguaje natural, recibiendo respuestas breves con citas de los documentos. Está desarrollado con **React + TypeScript** en el frontend y **FastAPI** en el backend, desplegado completamente con **Docker Compose**.

---

## 📁 Estructura del proyecto

```
prueba-t-cnica/
├── backend/          # FastAPI (API, ingestión y búsqueda)
├── frontend/         # React + TypeScript (interfaz de usuario)
├── .env             # Variables de entorno
├── docker-compose.yml
└── README.md
```

---

## 🚀 Requisitos

- **Docker** y **Docker Compose** (para despliegue)
- **Node.js 20+** (para desarrollo local del frontend sin Docker)
- **Python 3.12+** (para desarrollo local del backend sin Docker)

---

## ⚙️ Configuración rápida

### 1. Clonar el repositorio

```bash
git clone <repo-url> mini-qna
cd mini-qna
```

### 2. Renombrar archivos `.env.example a .env`

### 3. Levantar los contenedores

```bash
docker-compose up --build -d
```

### 4. Acceder a la app

| Servicio    | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:5173 |
| Backend API | http://localhost:8000 |

**Nota**: Dentro del contenedor frontend, las llamadas al backend se hacen gracias a la red definida en Docker Compose.

### 5. Detener y limpiar

Para detener los contenedores y limpiar volúmenes (resetear el entorno):

```bash
docker-compose down -v
```

---

## 🛠️ Funcionalidades

### Uploader

- Soporta la carga de **3 a 10 archivos** en formatos `.txt` y `.pdf`.
- Interfaz con **drag & drop** y selección manual de archivos.
- Muestra el estado de cada archivo: **subiendo**, **completado** o **error**.
- Botón para eliminar todos los archivos indexados, visible solo cuando hay documentos cargados.

### Buscador

- Campo buscar simple para consultas en texto.
- Devuelve fragmentos relevantes con:
  - Texto del fragmento.
  - Nombre del documento.
  - Puntaje de relevancia (basado en TF-IDF).

### Q&A

- Permite preguntas en **lenguaje natural**.
- Responde en **3–4 líneas** con hasta **3 citas** de los documentos.
- Si no hay contexto suficiente, muestra: **“No se encontró información relevante”**.
- Si no hay documentos, muestra: **“No hay archivos indexados. Por favor, suba documentos primero.”**.

---

## 🧩 Decisiones técnicas y supuestos

### Backend

- **Framework**: FastAPI, por su rapidez y soporte nativo para async.
- **Procesamiento de archivos**:
  - PDFs procesados con **PyMuPDF** para extraer texto.
  - Archivos `.txt` leídos directamente como texto plano.
- **Indexación**: Documentos divididos en fragmentos y almacenados en memoria usando un índice basado en **TF-IDF** (Opción 1 – Clásica).
- **Persistencia**: Índice en memoria (sin almacenamiento en disco para simplicidad).
- **Validaciones**: Límite de 3 a 10 archivos

### Frontend

- **Stack**: React + TypeScript para tipado seguro y escalabilidad.
- **Estilos**: TailwindCSS para un diseño rápido, limpio y responsive.
- **Componentes**:
  - Uploader con drag & drop y feedback visual.
  - Buscador con lista de resultados clara.
  - Q&A con respuestas concisas y citas numeradas.
- **Estados**: Feedback claro para carga, errores y resultados vacíos.

### Despliegue

- **Docker Compose**: Define una red `app-net` para comunicación entre frontend y backend.

### Supuestos

- No se requiere autenticación ni manejo de sesiones.
- La solución prioriza funcionalidad y claridad sobre optimizaciones avanzadas.
- No se implementó persistencia en disco para mantener la simplicidad.
- Estilos minimalistas pero funcionales, enfocados en la usabilidad.

---

## ⏱️ Tiempo invertido

- **Tiempo estimado**: 6–8 horas.
- **Tiempo aproximado real invertido**: ~6/6.5 horas.

  - Backend: 2.5-3 horas (configuración de FastAPI, indexación, endpoints).
  - Frontend: 3.5 horas (interfaz, conexión con API, estados)

## 📸 Capturas / GIF

### GIF de demostración

![Demo GIF](gif/mini-qa-app.gif)
_Flujo completo: subir archivos, buscar contenido y hacer una pregunta (<30s)._

¡Gracias por revisar mi solución! Espero que cumpla con las expectativas. 🚀
