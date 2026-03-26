"use client";

import { motion } from "framer-motion";
import { Moon, Sun, List, X } from "@phosphor-icons/react";
import { useDarkMode } from "../hooks/useDarkMode";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { isDark, toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(var(--glass-blur))",
        WebkitBackdropFilter: "blur(var(--glass-blur))",
        borderBottom: "1px solid var(--glass-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 no-underline">
          <Image
            src="/logo.png"
            alt="PixelForge"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-contain"
          />
          <span
            className="font-display text-lg sm:text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Pixel<span className="gradient-text">Forge</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How It Works", "Convert"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm font-medium transition-colors duration-200 no-underline"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer border-none"
            style={{
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} weight="duotone" /> : <Moon size={18} weight="duotone" />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer border-none"
            style={{
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
              color: "var(--text-secondary)",
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
        >
          {["Features", "How It Works", "Convert"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium py-2.5 px-3 rounded-lg no-underline transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
