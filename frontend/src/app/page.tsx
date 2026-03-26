"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import ConverterTool from "../components/ConverterTool";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div id="page-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ConverterTool />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
