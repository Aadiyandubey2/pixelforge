import CTASection from "../components/CTASection";
import ConverterTool from "../components/ConverterTool";
import FAQSection from "../components/FAQSection";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";
import { createHomePageSchema } from "../lib/seo";

export default function Home() {
  const schema = createHomePageSchema();

  return (
    <div id="page-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <ConverterTool />
        <FAQSection />
        <CTASection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Footer />
    </div>
  );
}
