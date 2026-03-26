import { FAQS } from "../lib/seo";

export default function FAQSection() {
  return (
    <section id="faq" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 sm:mb-3 gradient-text">
            FAQ
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Answers for common <span className="gradient-text">image converter</span> questions
          </h2>
          <p
            className="text-sm sm:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            PixelForge is built for people searching for a fast, free, and private way to convert images to WebP and AVIF online.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="glass-card px-5 py-4 sm:px-6 sm:py-5"
            >
              <summary
                className="cursor-pointer list-none text-base sm:text-lg font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {faq.question}
              </summary>
              <p
                className="mt-3 text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
