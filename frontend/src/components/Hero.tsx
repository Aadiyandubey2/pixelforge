"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Image as ImageIcon,
  CloudArrowUp,
} from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12">
      <div
        className="absolute top-[10%] left-[5%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] animate-pulse-glow dark:hidden"
        style={{ background: "rgba(6,182,212,0.2)", animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] rounded-full blur-[120px] animate-pulse-glow dark:hidden"
        style={{ background: "rgba(252,165,165,0.15)", animationDelay: "2s" }}
      />

      <div
        className="hidden dark:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-30"
        style={{ background: "radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-medium"
            style={{
              background: "var(--glass-bg)",
              backdropFilter: "blur(12px)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
            Free Online WebP and AVIF Converter
          </motion.div>

          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6"
            style={{ color: "var(--foreground)" }}
          >
            Convert images
            <br />
            to <span className="gradient-text">WebP</span> and{" "}
            <span className="gradient-text">AVIF</span>
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-8 leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Convert PNG to WebP, JPG to AVIF, GIF, BMP, TIFF, and WebP files
            online with fast, private, browser-based image optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.a
              href="#convert"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-white font-semibold text-sm sm:text-base no-underline"
              style={{
                background: "var(--gradient-button)",
                boxShadow: "var(--shadow-button)",
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Converting
              <ArrowRight size={18} weight="bold" />
            </motion.a>

            <motion.a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base no-underline"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--glass-border)",
                color: "var(--foreground)",
                boxShadow: "var(--shadow-card)",
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 max-w-md w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="glass-card p-5 sm:p-8 animate-float" style={{ animationDuration: "8s" }}>
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                style={{ background: "var(--gradient-button)" }}
              >
                <CloudArrowUp size={24} weight="duotone" color="#fff" />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>
                  Image Converter
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  Drag and drop to convert
                </p>
              </div>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {[
                { name: "hero-banner.png", size: "2.4 MB", converted: "420 KB", pct: 82 },
                { name: "product-shot.jpg", size: "1.8 MB", converted: "310 KB", pct: 83 },
                { name: "thumbnail.bmp", size: "5.1 MB", converted: "180 KB", pct: 96 },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl"
                  style={{
                    background: "var(--bg-card-alt)",
                    border: "1px solid var(--border-light)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "var(--gradient-subtle)" }}
                  >
                    <ImageIcon size={18} weight="duotone" color="var(--accent-primary)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>
                      {item.name}
                    </p>
                    <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {item.size} -&gt; {item.converted} <span style={{ color: "#22C55E" }}>(-{item.pct}%)</span>
                    </p>
                  </div>
                  <span
                    className="text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded-md"
                    style={{ background: "rgba(34,197,94,0.1)", color: "#22C55E" }}
                  >
                    Done
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
