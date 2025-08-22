import React, { useRef } from "react";
import { useUploadContext, type FileItem } from "../contexts/UploadContext";

const MAX_FILES = 10;

const Uploader = () => {
  const { files, uploadFiles } = useUploadContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;

    if (selectedFiles.length > MAX_FILES) {
      alert(`Máximo ${MAX_FILES} archivos a la vez.`);
      return;
    }

    const invalidFiles = selectedFiles.filter(
      (f) => !f.name.match(/\.(txt|pdf)$/i)
    );
    if (invalidFiles.length > 0) {
      alert(
        `Archivos inválidos: ${invalidFiles.map((f) => f.name).join(", ")}`
      );
      return;
    }

    uploadFiles(selectedFiles);
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(Array.from(e.target.files));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div
        className="border-2 border-dashed border-gray-400 p-8 text-center cursor-pointer rounded hover:border-blue-500 transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-600">
          Arrastra tus archivos aquí o haz click (.txt, .pdf)
        </p>
        <input
          type="file"
          multiple
          accept=".txt,.pdf"
          ref={fileInputRef}
          onChange={handleFilesSelected}
          className="hidden"
        />
      </div>

      <div className="mt-4">
        {files.length === 0 && (
          <p className="text-gray-500">No hay archivos subidos aún.</p>
        )}
        {files.map((file: FileItem) => (
          <div
            key={file.name}
            className="flex justify-between items-center mb-2 p-2 border rounded"
          >
            <span>{file.name}</span>
            <span>
              {file.status === "pending" && (
                <span className="text-blue-500">Subiendo...</span>
              )}
              {file.status === "success" && (
                <span className="text-green-600">✅ Completado</span>
              )}
              {file.status === "error" && (
                <span className="text-red-600">❌ {file.message}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Uploader;
