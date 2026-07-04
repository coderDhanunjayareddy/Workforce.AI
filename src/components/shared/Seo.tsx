import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

const setMeta = (name: string, content: string, attribute: "name" | "property" = "name") => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
};

export function Seo({ title, description, path = "/" }: SeoProps) {
  useEffect(() => {
    const canonical = `https://workforce-ai.demo${path}`;
    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", canonical, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);

    let script = document.head.querySelector<HTMLScriptElement>("#workforce-ai-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "workforce-ai-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Workforce AI",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      url: canonical
    });
  }, [description, path, title]);

  return null;
}
