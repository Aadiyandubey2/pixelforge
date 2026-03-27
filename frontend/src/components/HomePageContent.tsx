"use client";

import CTASection from "./CTASection";
import ConverterTool from "./ConverterTool";
import FAQSection from "./FAQSection";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Navbar from "./Navbar";
import { useImageConverter } from "../hooks/useImageConverter";

export default function HomePageContent() {
  const converter = useImageConverter();

  return (
    <>
      <Navbar />
      <main>
        <Hero converter={converter} />
        <Features />
        <HowItWorks />
        <ConverterTool converter={converter} />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
