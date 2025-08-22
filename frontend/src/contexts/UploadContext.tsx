import { createContext, useContext, useState, type ReactNode } from "react";
import { uploadFiles as apiUploadFiles, deleteFiles } from "../services/api";
import { type FileItem } from "../interfaces/File";

interface UploadContextType {
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
  uploadFiles: (newFiles: File[]) => Promise<void>;
  deleteAllFiles: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileItem[]>([]);

  const uploadFiles = async (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map((f) => ({
      name: f.name,
      status: "pending",
    }));
    setFiles(fileItems);

    try {
      await apiUploadFiles(newFiles);
      setFiles((prev) => prev.map((f) => ({ ...f, status: "success" })));
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      setFiles((prev) => prev.map((f) => ({ ...f, status: "error", message })));
    }
  };

  const deleteAllFiles = async () => {
    try {
      await deleteFiles();
      setFiles([]);
    } catch (error) {
      console.error("Error eliminando documentos:", error);
      throw error;
    }
  };

  return (
    <UploadContext.Provider
      value={{ files, setFiles, uploadFiles, deleteAllFiles }}
    >
      {children}
    </UploadContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context)
    throw new Error("useUploadContext debe usarse dentro de UploadProvider");
  return context;
};
