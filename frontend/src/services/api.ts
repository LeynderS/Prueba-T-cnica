import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await api.post("/ingest", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error subiendo archivos:", error);
    throw error;
  }
};

export const searchQuery = async (q: string) => {
  const response = await api.get(`/search?q=${encodeURIComponent(q)}`);
  return response.data;
};

export default api;
