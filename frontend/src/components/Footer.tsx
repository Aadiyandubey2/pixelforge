"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-8 sm:py-12 border-t" style={{ borderColor: "var(--border-light)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PixelForge logo" width={28} height={28} className="w-7 h-7 rounded-md object-contain" />
            <span className="font-display text-base sm:text-lg font-bold" style={{ color: "var(--foreground)" }}>
              Pixel<span className="gradient-text">Forge</span>
            </span>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Built by <span className="gradient-text font-semibold">Aadiyan Dubey</span>
            </p>
            <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-tertiary)" }}>
              B.Tech CSE - NIT Nagaland | Roll No. 2023105326
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t text-center" style={{ borderColor: "var(--border-light)" }}>
          <p className="text-[10px] sm:text-xs" style={{ color: "var(--text-tertiary)" }}>
            Copyright {new Date().getFullYear()} PixelForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
