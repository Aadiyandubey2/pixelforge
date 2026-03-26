export const SITE_URL = "https://pixelforge.aadiyandubey.me";
export const SITE_NAME = "PixelForge";
export const SITE_TITLE = "PixelForge | Free WebP and AVIF Image Converter";
export const SITE_DESCRIPTION =
  "Convert PNG, JPG, JPEG, GIF, BMP, TIFF, and WebP to WebP or AVIF online. Free, private, browser-based batch image conversion with ZIP downloads.";
export const SITE_IMAGE = `${SITE_URL}/logo.png`;
export const LAST_MODIFIED = "2026-03-27";

export const SITE_KEYWORDS = [
  "image converter",
  "online image converter",
  "free image converter",
  "WebP converter",
  "AVIF converter",
  "PNG to WebP",
  "JPG to WebP",
  "JPG to AVIF",
  "JPEG to AVIF",
  "batch image converter",
  "browser image converter",
  "image compressor",
  "WebP image optimizer",
  "AVIF image optimizer",
];

export const FAQS = [
  {
    question: "What is PixelForge?",
    answer:
      "PixelForge is a free online image converter that turns PNG, JPG, JPEG, GIF, BMP, TIFF, and WebP files into WebP or AVIF in your browser.",
  },
  {
    question: "How do I convert PNG to WebP or JPG to AVIF?",
    answer:
      "Upload your image, choose WebP or AVIF, adjust the quality slider, and download the converted file. You can also convert multiple images and download them as a ZIP.",
  },
  {
    question: "Is PixelForge free to use?",
    answer:
      "Yes. PixelForge is free to use with no signup, no watermark, and no paywall for the core conversion flow.",
  },
  {
    question: "Are my images private on PixelForge?",
    answer:
      "Yes. The main conversion flow runs in your browser, so your images stay on your device during conversion.",
  },
  {
    question: "Which image formats does PixelForge support?",
    answer:
      "PixelForge accepts PNG, JPG, JPEG, GIF, BMP, TIFF, and WebP files and exports optimized WebP or AVIF images.",
  },
];

export function createHomePageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: SITE_IMAGE,
          width: 640,
          height: 640,
        },
        founder: {
          "@type": "Person",
          name: "Aadiyan Dubey",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en-US",
        publisher: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}#webpage`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        dateModified: LAST_MODIFIED,
        isPartOf: {
          "@id": `${SITE_URL}#website`,
        },
        about: SITE_KEYWORDS.map((keyword) => ({
          "@type": "Thing",
          name: keyword,
        })),
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: SITE_IMAGE,
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}#app`,
        name: SITE_NAME,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and a modern web browser.",
        url: SITE_URL,
        image: SITE_IMAGE,
        description: SITE_DESCRIPTION,
        keywords: SITE_KEYWORDS.join(", "),
        featureList: [
          "Convert PNG to WebP",
          "Convert JPG and JPEG to AVIF",
          "Batch image conversion",
          "Browser-based processing",
          "ZIP downloads for converted files",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        creator: {
          "@id": `${SITE_URL}#organization`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
