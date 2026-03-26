"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6"
          style={{ color: "var(--foreground)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to optimize
          <br />
          your images?
        </motion.h2>

        <motion.p
          className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 px-4"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Start converting for free. No sign-up, no watermarks, no limits.
        </motion.p>

        <motion.a
          href="#convert"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base no-underline text-white"
          style={{
            background: "var(--gradient-button)",
            boxShadow: "var(--shadow-button)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Start Converting Now
          <ArrowRight size={18} weight="bold" />
        </motion.a>
      </div>
    </section>
  );
}
