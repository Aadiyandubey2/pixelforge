import axios from "axios";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function normalizeBaseUrl(baseUrl?: string): string {
  return (baseUrl ?? "").trim().replace(/\/+$/, "");
}

function isLocalHost(hostname?: string): boolean {
  return typeof hostname === "string" && LOCAL_HOSTS.has(hostname);
}

function resolveApiBaseUrl(): string {
  const configuredBaseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL);
  if (configuredBaseUrl) {
    return configuredBaseUrl;
  }

  if (typeof window !== "undefined" && isLocalHost(window.location.hostname)) {
    return "http://localhost:8000";
  }

  return "";
}

function withApiBase(path: string): string {
  return `${resolveApiBaseUrl()}${path}`;
}

function toRequestError(error: unknown): Error {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error : new Error("Request failed");
  }

  const detail =
    typeof error.response?.data === "object" &&
    error.response?.data !== null &&
    "detail" in error.response.data &&
    typeof error.response.data.detail === "string"
      ? error.response.data.detail
      : null;

  if (
    error.response?.status === 404 &&
    !normalizeBaseUrl(process.env.NEXT_PUBLIC_API_URL) &&
    typeof window !== "undefined" &&
    !isLocalHost(window.location.hostname)
  ) {
    return new Error(
      "Production API is not configured. Set NEXT_PUBLIC_API_URL to your deployed backend URL."
    );
  }

  if (detail) {
    return new Error(detail);
  }

  return new Error(error.message || "Request failed");
}

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

  try {
    const response = await axios.post<ConvertResponse>(
      withApiBase("/api/convert"),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    throw toRequestError(error);
  }
}

export function getDownloadUrl(fileId: string): string {
  return withApiBase(`/api/download/${fileId}`);
}

export async function downloadAll(ids: string[]): Promise<Blob> {
  try {
    const response = await axios.post(
      withApiBase("/api/download-all"),
      { ids },
      { responseType: "blob" }
    );

    return response.data;
  } catch (error) {
    throw toRequestError(error);
  }
}
