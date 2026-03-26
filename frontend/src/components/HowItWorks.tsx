"use client";

import { motion } from "framer-motion";
import { CloudArrowUp, ArrowsClockwise, DownloadSimple } from "@phosphor-icons/react";
import AnimatedColorIcon from "./AnimatedColorIcon";

const steps = [
  {
    icon: CloudArrowUp,
    step: "01",
    title: "Upload",
    description: "Drag & drop or browse for your images. We support PNG, JPG, GIF, BMP, TIFF and more.",
  },
  {
    icon: ArrowsClockwise,
    step: "02",
    title: "Convert",
    description: "Choose WebP or AVIF, set your quality, and hit convert. Our engine does the rest.",
  },
  {
    icon: DownloadSimple,
    step: "03",
    title: "Download",
    description: "Grab individual files or download everything as a ZIP. Instant, no waiting.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 gradient-text">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" style={{ color: "var(--foreground)" }}>
            Three simple <span className="gradient-text">steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative">
          <div
            className="hidden md:block absolute top-[60px] left-[16.67%] right-[16.67%] h-px"
            style={{ background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-emerald))", opacity: 0.3 }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="relative mb-5 sm:mb-6">
                <div className="glass-card w-24 h-24 sm:w-[120px] sm:h-[120px] rounded-2xl sm:rounded-3xl flex items-center justify-center">
                  <AnimatedColorIcon icon={step.icon} colorIndex={i + 3} size={48} />
                </div>
                <span
                  className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold text-white"
                  style={{ background: "var(--gradient-button)" }}
                >
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2" style={{ color: "var(--foreground)" }}>
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm max-w-xs leading-relaxed px-2" style={{ color: "var(--text-secondary)" }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
