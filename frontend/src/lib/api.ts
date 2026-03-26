import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
});

export interface ConvertedFile {
  id: string;
  original_name: string;
  converted_name: string;
  original_size: number;
  converted_size: number;
  download_url: string;
}

export interface ConvertResponse {
  results: ConvertedFile[];
}

export async function convertImages(
  files: File[],
  format: "webp" | "avif",
  quality: number = 80
): Promise<ConvertResponse> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("format", format);
  formData.append("quality", String(quality));

  const response = await api.post<ConvertResponse>("/api/convert", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export function getDownloadUrl(fileId: string): string {
  return `${API_BASE}/api/download/${fileId}`;
}

export async function downloadAll(ids: string[]): Promise<Blob> {
  const response = await api.post(
    "/api/download-all",
    { ids },
    { responseType: "blob" }
  );
  return response.data;
}
