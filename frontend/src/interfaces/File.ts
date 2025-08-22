interface FileItem {
  name: string;
  status: "pending" | "success" | "error";
  message?: string;
}

export type { FileItem };
