import HomePageContent from "../components/HomePageContent";
import { createHomePageSchema } from "../lib/seo";

export default function Home() {
  const schema = createHomePageSchema();

  return (
    <div id="page-wrapper">
      <HomePageContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
