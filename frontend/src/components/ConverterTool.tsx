"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  CloudArrowUp,
  Image as ImageIcon,
  DownloadSimple,
  Trash,
  CheckCircle,
  CircleNotch,
  FileZip,
} from "@phosphor-icons/react";
import { useState, useCallback, useRef } from "react";
import {
  convertImages,
  getDownloadUrl,
  downloadAll,
  type ConvertedFile,
} from "../lib/api";

interface UploadedImage {
  file: File;
  preview: string;
  status: "pending" | "converting" | "done" | "error";
  result?: ConvertedFile;
  error?: string;
}

export default function ConverterTool() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [format, setFormat] = useState<"webp" | "avif">("webp");
  const [quality, setQuality] = useState(80);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newImages: UploadedImage[] = Array.from(files)
      .filter((f) => /\.(png|jpe?g|bmp|gif|tiff?|webp)$/i.test(f.name))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        status: "pending" as const,
      }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      return copy;
    });
  }, []);

  const handleConvert = async () => {
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
    }

    setIsConverting(false);
  };

  const handleDownloadAll = async () => {
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
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const doneCount = images.filter((img) => img.status === "done").length;
  const pendingCount = images.filter((img) => img.status === "pending").length;

  return (
    <section
      id="convert"
      className="relative py-16 sm:py-24 md:py-32"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--border-card), transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 gradient-text">
            Converter
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Start <span className="gradient-text">converting</span>
          </h2>
        </motion.div>

        {/* Tool Card */}
        <motion.div
          className="glass-card p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Controls Row */}
          <div className="flex flex-col gap-4 mb-4 sm:mb-6">
            {/* Top row: format + quality */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              {/* Format toggle */}
              <div
                className="flex rounded-xl p-1 shrink-0"
                style={{
                  background: "var(--bg-card-alt)",
                  border: "1px solid var(--border-light)",
                }}
              >
                {(["webp", "avif"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className="flex-1 sm:flex-none px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer border-none"
                    style={{
                      background:
                        format === f
                          ? "var(--gradient-button)"
                          : "transparent",
                      color: format === f ? "#fff" : "var(--text-secondary)",
                      boxShadow:
                        format === f ? "var(--shadow-button)" : "none",
                    }}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Quality slider */}
              <div className="flex items-center gap-3 flex-1">
                <span
                  className="text-xs sm:text-sm font-medium whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Quality
                </span>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="flex-1 h-2"
                  style={{ accentColor: "#0D9488", maxWidth: 200 }}
                />
                <span
                  className="text-xs sm:text-sm font-bold w-8 sm:w-10 text-right gradient-text"
                >
                  {quality}
                </span>
              </div>
            </div>

            {/* Actions row */}
            <div className="flex flex-wrap gap-2">
              {pendingCount > 0 && (
                <motion.button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white cursor-pointer border-none disabled:opacity-50"
                  style={{
                    background: "var(--gradient-button)",
                    boxShadow: "var(--shadow-button)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {isConverting
                    ? "Converting…"
                    : `Convert ${pendingCount} file${pendingCount > 1 ? "s" : ""}`}
                </motion.button>
              )}
              {doneCount > 1 && (
                <motion.button
                  onClick={handleDownloadAll}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer border-none flex items-center gap-2"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                    color: "var(--foreground)",
                    boxShadow: "var(--shadow-card)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <FileZip size={16} weight="duotone" />
                  ZIP All
                </motion.button>
              )}
              {images.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm cursor-pointer border-none"
                  style={{
                    background: "transparent",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Drop Zone */}
          {images.length === 0 && (
            <motion.div
              className="relative rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
              style={{
                border: `2px dashed ${isDragging ? "var(--accent-primary)" : "var(--border-light)"}`,
                background: isDragging
                  ? "rgba(13,148,136,0.04)"
                  : "var(--bg-card-alt)",
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                addFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.005 }}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.bmp,.gif,.tiff,.tif,.webp"
                className="hidden"
                onChange={(e) => e.target.files && addFiles(e.target.files)}
              />
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
                style={{
                  background: "var(--gradient-subtle)",
                }}
              >
                <CloudArrowUp
                  size={28}
                  weight="duotone"
                  color="var(--accent-primary)"
                />
              </div>
              <p
                className="font-semibold text-sm sm:text-base mb-1"
                style={{ color: "var(--foreground)" }}
              >
                Drop images here or{" "}
                <span className="gradient-text">browse</span>
              </p>
              <p
                className="text-xs sm:text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                PNG, JPG, GIF, BMP, TIFF — up to 50 MB each
              </p>
            </motion.div>
          )}

          {/* Image Grid */}
          {images.length > 0 && (
            <div>
              {/* Small drop zone */}
              <div
                className="rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex items-center gap-3 cursor-pointer transition-all"
                style={{
                  border: `2px dashed ${isDragging ? "var(--accent-primary)" : "var(--border-light)"}`,
                  background: isDragging
                    ? "rgba(13,148,136,0.04)"
                    : "transparent",
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".png,.jpg,.jpeg,.bmp,.gif,.tiff,.tif,.webp"
                  className="hidden"
                  onChange={(e) => e.target.files && addFiles(e.target.files)}
                />
                <CloudArrowUp
                  size={20}
                  weight="duotone"
                  color="var(--accent-primary)"
                />
                <span
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Add more images
                </span>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <AnimatePresence mode="popLayout">
                  {images.map((img, index) => (
                    <motion.div
                      key={`${img.file.name}-${index}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl overflow-hidden"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-light)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="relative h-28 sm:h-36 overflow-hidden"
                        style={{ background: "var(--bg-card-alt)" }}
                      >
                        <img
                          src={img.preview}
                          alt={img.file.name}
                          className="w-full h-full object-cover"
                        />
                        {img.status === "converting" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <CircleNotch
                              size={28}
                              weight="bold"
                              color="#fff"
                              className="animate-spin"
                            />
                          </div>
                        )}
                        {img.status === "done" && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle
                              size={22}
                              weight="fill"
                              color="#22C55E"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center cursor-pointer border-none opacity-0 hover:opacity-100 transition-opacity"
                          style={{
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          <Trash size={12} weight="bold" color="#fff" />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-2.5 sm:p-3">
                        <p
                          className="text-xs sm:text-sm font-medium truncate mb-1"
                          style={{ color: "var(--foreground)" }}
                        >
                          {img.file.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <p
                            className="text-[10px] sm:text-xs"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            {formatFileSize(img.file.size)}
                            {img.result && (
                              <>
                                {" → "}
                                {formatFileSize(img.result.converted_size)}
                                <span style={{ color: "#22C55E" }}>
                                  {" "}
                                  (-
                                  {Math.round(
                                    (1 -
                                      img.result.converted_size /
                                        img.result.original_size) *
                                      100
                                  )}
                                  %)
                                </span>
                              </>
                            )}
                          </p>
                          {img.status === "done" && img.result && (
                            <a
                              href={getDownloadUrl(img.result.id)}
                              download={img.result.converted_name}
                              className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold no-underline gradient-text"
                            >
                              <DownloadSimple size={13} weight="bold" />
                              Save
                            </a>
                          )}
                          {img.status === "error" && (
                            <span className="text-[10px] sm:text-xs text-red-500">
                              Error
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
