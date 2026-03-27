"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  convertImages,
  downloadAll,
  releaseConvertedFile,
  type ConvertedFile,
  type OutputFormat,
} from "../lib/api";

export interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "converting" | "done" | "error";
  result?: ConvertedFile;
  error?: string;
}

export const SUPPORTED_INPUT_FORMATS = [
  "PNG",
  "JPG",
  "GIF",
  "BMP",
  "TIFF",
  "WebP",
] as const;

export const ACCEPTED_IMAGE_TYPES =
  ".png,.jpg,.jpeg,.bmp,.gif,.tiff,.tif,.webp";

function createQueueItemId(file: File): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${file.name}-${file.lastModified}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function cleanupImage(image: UploadedImage) {
  if (image.result) {
    releaseConvertedFile(image.result.id);
  }

  URL.revokeObjectURL(image.preview);
}

export function useImageConverter() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [format, setFormat] = useState<OutputFormat>("webp");
  const [quality, setQuality] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<UploadedImage[]>([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      imagesRef.current.forEach(cleanupImage);
    };
  }, []);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: UploadedImage[] = Array.from(files)
      .filter((file) => /\.(png|jpe?g|bmp|gif|tiff?|webp)$/i.test(file.name))
      .map((file) => ({
        id: createQueueItemId(file),
        file,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));

    if (newImages.length === 0) {
      return;
    }

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const [image] = copy.splice(index, 1);

      if (image) {
        cleanupImage(image);
      }

      return copy;
    });
  }, []);

  const handleConvert = useCallback(async () => {
    const pending = images.filter((img) => img.status === "pending");
    if (pending.length === 0) return;

    setIsConverting(true);
    setImages((prev) =>
      prev.map((img) =>
        img.status === "pending" ? { ...img, status: "converting" } : img
      )
    );

    try {
      const response = await convertImages(
        pending.map((img) => img.file),
        format,
        quality
      );

      setImages((prev) => {
        const copy = [...prev];
        let resultIdx = 0;

        for (let i = 0; i < copy.length; i++) {
          if (
            copy[i].status === "converting" &&
            resultIdx < response.results.length
          ) {
            copy[i] = {
              ...copy[i],
              status: "done",
              result: response.results[resultIdx],
              error: undefined,
            };
            resultIdx++;
          }
        }

        return copy;
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Conversion failed";

      setImages((prev) =>
        prev.map((img) =>
          img.status === "converting"
            ? { ...img, status: "error", error: errorMessage }
            : img
        )
      );
    } finally {
      setIsConverting(false);
    }
  }, [format, images, quality]);

  const handleDownloadAll = useCallback(async () => {
    const doneIds = images
      .filter((img) => img.status === "done" && img.result)
      .map((img) => img.result!.id);

    if (doneIds.length === 0) return;

    try {
      const blob = await downloadAll(doneIds);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_images.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Ignore download errors
    }
  }, [images]);

  const clearAll = useCallback(() => {
    setImages((prev) => {
      prev.forEach(cleanupImage);
      return [];
    });
  }, []);

  const formatFileSize = useCallback((bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }, []);

  const doneCount = images.filter((img) => img.status === "done").length;
  const pendingCount = images.filter((img) => img.status === "pending").length;

  return {
    images,
    format,
    setFormat,
    quality,
    setQuality,
    isDragging,
    setIsDragging,
    isConverting,
    fileInputRef,
    addFiles,
    removeImage,
    handleConvert,
    handleDownloadAll,
    clearAll,
    formatFileSize,
    doneCount,
    pendingCount,
  };
}

export type UseImageConverterResult = ReturnType<typeof useImageConverter>;
