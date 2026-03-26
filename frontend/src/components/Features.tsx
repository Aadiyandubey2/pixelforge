"use client";

import { motion } from "framer-motion";
import {
  Lightning,
  ShieldCheck,
  Files,
  Gauge,
  PaintBrush,
  CloudArrowDown,
} from "@phosphor-icons/react";
import AnimatedColorIcon from "./AnimatedColorIcon";

const features = [
  { icon: Lightning, title: "Blazing Fast", description: "Server-side conversion with optimized Pillow pipeline. Results in seconds, not minutes." },
  { icon: ShieldCheck, title: "Privacy First", description: "Files are auto-deleted after conversion. Nothing stored, nothing tracked." },
  { icon: Files, title: "Batch Convert", description: "Upload multiple files at once and convert them all in a single click." },
  { icon: Gauge, title: "Quality Control", description: "Fine-tune compression with our quality slider. Find the perfect size-to-quality ratio." },
  { icon: PaintBrush, title: "Format Choice", description: "Choose between WebP for broad compatibility or AVIF for maximum compression." },
  { icon: CloudArrowDown, title: "ZIP Download", description: "Download all converted files as a single ZIP archive. One click, all files." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function Features() {
  return (
    <section id="features" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 gradient-text">Features</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" style={{ color: "var(--foreground)" }}>
            Everything you <span className="gradient-text">need</span>
          </h2>
          <p className="text-sm sm:text-lg max-w-2xl mx-auto px-2" style={{ color: "var(--text-secondary)" }}>
            A powerful, privacy-focused image converter with all the features you&apos;d expect from a premium tool — for free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="glass-card group p-5 sm:p-7 cursor-default"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-5 sm:mb-6"
                style={{ background: "var(--gradient-subtle)" }}
              >
                <AnimatedColorIcon icon={feature.icon} colorIndex={i} size={28} />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2" style={{ color: "var(--foreground)" }}>
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
