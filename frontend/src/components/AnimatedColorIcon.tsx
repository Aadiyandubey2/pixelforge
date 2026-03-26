"use client";

import { motion } from "framer-motion";
import { Icon as PhosphorIcon } from "@phosphor-icons/react";

const iconGradients = [
  { id: "grad-blue-purple", start: "#3b82f6", end: "#8b5cf6" }, // 0
  { id: "grad-emerald-teal", start: "#10b981", end: "#14b8a6" }, // 1
  { id: "grad-amber-red", start: "#f59e0b", end: "#ef4444" }, // 2
  { id: "grad-purple-pink", start: "#8b5cf6", end: "#ec4899" }, // 3
  { id: "grad-cyan-blue", start: "#06b6d4", end: "#3b82f6" }, // 4
  { id: "grad-teal-amber", start: "#14b8a6", end: "#f59e0b" }, // 5
];

export default function AnimatedColorIcon({
  icon: Icon,
  colorIndex = 0,
  size = 32,
}: {
  icon: PhosphorIcon;
  colorIndex?: number;
  size?: number;
}) {
  const gradient = iconGradients[colorIndex % iconGradients.length];

  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-full"
      whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Definitions for gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradient.id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor={gradient.start} offset="0%" />
            <stop stopColor={gradient.end} offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background blurred glowing version */}
      <motion.div
        className="absolute blur-[6px] opacity-60 dark:opacity-40"
        animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: colorIndex * 0.2 }}
      >
        <Icon size={size} weight="duotone" color={`url(#${gradient.id})`} />
      </motion.div>

      {/* Foreground crisp animated floating version */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: colorIndex * 0.2 }}
      >
        <Icon size={size} weight="duotone" color={`url(#${gradient.id})`} />
      </motion.div>
    </motion.div>
  );
}
