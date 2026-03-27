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

export type OutputFormat = "webp" | "avif";

interface StoredConvertedFile {
  blob: Blob;
  metadata: ConvertedFile;
}

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;
const convertedFileStore = new Map<string, StoredConvertedFile>();

function ensureBrowserRuntime() {
  if (typeof window === "undefined") {
    throw new Error("Image conversion is only available in the browser.");
  }
}

function createFileId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `file-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getMimeType(format: OutputFormat): string {
  return format === "avif" ? "image/avif" : "image/webp";
}

function buildConvertedName(filename: string, format: OutputFormat): string {
  const extensionIndex = filename.lastIndexOf(".");
  const stem = extensionIndex > 0 ? filename.slice(0, extensionIndex) : filename;
  return `${stem}.${format}`;
}

async function loadImageData(file: File): Promise<ImageData> {
  ensureBrowserRuntime();

  const bitmap = await createImageBitmap(file);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) {
      throw new Error("Could not initialize the image converter.");
    }

    context.drawImage(bitmap, 0, 0);
    return context.getImageData(0, 0, canvas.width, canvas.height);
  } finally {
    bitmap.close();
  }
}

async function encodeImage(
  imageData: ImageData,
  format: OutputFormat,
  quality: number
): Promise<ArrayBuffer> {
  if (format === "webp") {
    const { encode } = await import("@jsquash/webp");
    return encode(imageData, {
      quality,
      alpha_quality: quality,
      method: 4,
    });
  }

  const { encode } = await import("@jsquash/avif");
  return encode(imageData, {
    quality,
    qualityAlpha: quality,
    speed: 6,
    lossless: quality === 100,
  });
}

function registerConvertedFile(
  file: File,
  format: OutputFormat,
  buffer: ArrayBuffer
): ConvertedFile {
  const blob = new Blob([buffer], { type: getMimeType(format) });
  const id = createFileId();
  const metadata: ConvertedFile = {
    id,
    original_name: file.name,
    converted_name: buildConvertedName(file.name, format),
    original_size: file.size,
    converted_size: blob.size,
    download_url: URL.createObjectURL(blob),
  };

  convertedFileStore.set(id, {
    blob,
    metadata,
  });

  return metadata;
}

export async function convertImages(
  files: File[],
  format: OutputFormat,
  quality: number = 80
): Promise<ConvertResponse> {
  ensureBrowserRuntime();

  const results: ConvertedFile[] = [];

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`"${file.name}" exceeds the 50 MB limit.`);
    }

    const imageData = await loadImageData(file);
    const encodedBuffer = await encodeImage(imageData, format, quality);
    results.push(registerConvertedFile(file, format, encodedBuffer));
  }

  return { results };
}

export function getDownloadUrl(fileId: string): string {
  return convertedFileStore.get(fileId)?.metadata.download_url ?? "#";
}

export async function downloadAll(ids: string[]): Promise<Blob> {
  const { zipSync } = await import("fflate");
  const archiveFiles: Record<string, Uint8Array> = {};

  for (const id of ids) {
    const entry = convertedFileStore.get(id);
    if (!entry) {
      continue;
    }

    archiveFiles[entry.metadata.converted_name] = new Uint8Array(
      await entry.blob.arrayBuffer()
    );
  }

  if (Object.keys(archiveFiles).length === 0) {
    throw new Error("No converted files are available to download.");
  }

  const archive = zipSync(archiveFiles, { level: 6 });
  const archiveBuffer = new Uint8Array(archive).buffer;
  return new Blob([archiveBuffer], { type: "application/zip" });
}

export function releaseConvertedFile(fileId: string) {
  const entry = convertedFileStore.get(fileId);
  if (!entry) {
    return;
  }

  URL.revokeObjectURL(entry.metadata.download_url);
  convertedFileStore.delete(fileId);
}
