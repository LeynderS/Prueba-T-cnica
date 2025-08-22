import { useState } from "react";
import { askQuestion } from "../services/api";
import { AxiosError } from "axios";

interface Citation {
  document: string;
}

interface AnswerResult {
  question: string;
  answer: string;
  citations: Citation[];
}

const AskPage = () => {
  const [question, setQuestion] = useState("");
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswerResult(null);

    try {
      const data = await askQuestion(question);
      setAnswerResult(data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.detail || "Error desconocido");
      } else {
        setError("Ocurrió un error inesperado al realizar la pregunta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">Pregunta a tus documentos</h1>

      <div className="flex w-full max-w-xl gap-2 mb-6">
        <input
          type="text"
          placeholder="Escribe tu pregunta..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition"
        >
          Preguntar
        </button>
      </div>

      {loading && <p className="text-gray-500">Consultando...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {answerResult && (
        <div className="w-full max-w-6xl border border-gray-200 rounded-xl p-5 shadow-md bg-gray-50">
          <p className="text-gray-700 mb-2">
            <strong>Pregunta:</strong> {answerResult.question}
          </p>
          <p className="text-gray-800 mb-2 break-words">
            <strong>Respuesta:</strong> {answerResult.answer}
          </p>
          {answerResult.citations.length > 0 && (
            <div className="mt-2">
              <strong>Citas:</strong>
              <ul className="list-disc list-inside text-gray-500">
                {answerResult.citations.map((c, i) => (
                  <li key={i}>{c.document}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AskPage;
