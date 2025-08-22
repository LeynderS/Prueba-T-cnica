import { useState } from "react";
import { searchQuery } from "../services/api";
import { AxiosError } from "axios";

interface SearchResult {
  text: string;
  document: string;
  score: number;
}

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await searchQuery(query);
      setResults(data.results);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.detail || "Error desconocido");
      } else {
        setError("Ocurrió un error inesperado al buscar.");
      }
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-[70vh]">
      <h1 className="text-2xl font-bold mb-4">Buscar en documentos</h1>

      <div className="flex w-full max-w-xl gap-2 mb-6">
        <input
          type="text"
          placeholder="Escribe tu consulta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:from-indigo-600 hover:to-indigo-700 transition"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-gray-500">Buscando...</p>}

      {!loading && error && <p className="text-red-500 mb-4">{error}</p>}

      {!loading && !error && results.length > 0 && (
        <div className="w-full max-w-2xl space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 shadow-md bg-gray-50"
            >
              <p className="text-gray-700">{result.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Documento:{" "}
                <span className="font-medium">{result.document}</span>
              </p>
              <p className="text-sm text-gray-400">
                Score: {result.score.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && hasSearched && (
        <p className="text-gray-500">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchPage;
